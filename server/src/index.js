const express = require('express');
const body_parser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const JWT_PW = '1A5S4D4GF5S3';

const mongo = require('../config/mongo');
const app = express();

mongo.connectToServer();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

const farmsData = fs.readFileSync(path.join(__dirname, 'data/farms.csv'), {
    encoding: 'utf8'
});
const precipitationData = fs.readFileSync(
    path.join(__dirname, 'data/farms_precipitation.csv'),
    {
        encoding: 'utf8'
    }
);
const ndviData = fs.readFileSync(path.join(__dirname, 'data/farms_ndvi.csv'), {
    encoding: 'utf8'
});

app.get('/farms', async (req, res) => {
    const farmsDataJson = csvjson.toObject(farmsData);

    farmsDataJson.map(farm => {
        const geoJson = require(`./data/farm_${farm.farm_id}.json`);
        farm.geoJson = geoJson;
    });

    setTimeout(() => {
        res.status(200).send(farmsDataJson);
    }, 2000);
});
app.get('/farms/:id', async (req, res) => {
    const farmId = req.params.id;
    const farmsDataJson = csvjson.toObject(farmsData);

    const farm = farmsDataJson.filter(item => item.farm_id == farmId);
    const geoJson = require(`./data/farm_${farmId}.json`);
    farm[0].geoJson = geoJson;
    res.status(200).send(farm);
});

app.get('/precipitation', async (req, res) => {
    res.status(200).send(csvjson.toObject(precipitationData));
});

app.get('/precipitation/:id', async (req, res) => {
    const farmId = req.params.id;
    const precipitationDataJson = csvjson.toObject(precipitationData);

    precipitationDataJson.map(item => {
        Object.keys(item).forEach(itemKey => {
            if (itemKey != 'date' && itemKey != `precipitation_${farmId}`)
                delete item[itemKey];
        });
    });

    res.status(200).send(precipitationDataJson);
});

app.get('/ndvi', async (req, res) => {
    res.status(200).send(csvjson.toObject(ndviData));
});

app.get('/ndvi/:id', async (req, res) => {
    const farmId = req.params.id;
    const ndviDataJson = csvjson.toObject(ndviData);

    ndviDataJson.map(item => {
        Object.keys(item).forEach(itemKey => {
            if (itemKey != 'date' && itemKey != `ndvi_${farmId}`)
                delete item[itemKey];
        });
    });
    const newNdviDataArray = [{ id: `ndvi_${farmId}`, data: [] }];

    ndviDataJson.forEach(item => {
        newDataItem = { x: item.date, y: item[`ndvi_${farmId}`] };

        newNdviDataArray[0].data.push(newDataItem);
    });

    res.status(200).send(newNdviDataArray);
});

app.get('/chart-selector', async (req, res) => {
    res.status(200).send(require('./data/chart_selector.json'));
});

/**
 * Login route
 * @param {String} email - Email of login user
 * @param {String} password - Password of login user
 * @return {String} token
 */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const db = mongo.getDb();
    const user = await db.collection('user').findOne({ email, password });
    const token = jwt.sign(user, JWT_PW);
    res.status(200).send({ userData: user, token });
});

app.get('/auth', (req, res) => {
    let token = req.header('Authorization');
    token = token.split(' ')[1];
    const ok = jwt.verify(token, JWT_PW);
    res.status(200).send(ok);
});

app.get('/', (req, res) => {
    res.status(200).send('Gaivota Test');
});

app.listen(PORT !== 'undefined' ? PORT : 5000, () => {
    console.warn(PORT);
    console.warn('App is running at http://localhost:' + 5000);
});

module.exports = app;
