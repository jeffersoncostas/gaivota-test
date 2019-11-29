import { useDispatch } from 'react-redux';
import store from '../../store';
import { UploadCsvActionTypes } from '../../store/reducers/UploadCsv';

const csvjson = require('csvjson');

interface ChartData {
    id: string;
    data: ChartCoords[];
}

interface ChartCoords {
    x: string;
    y: string;
}

const parseCsvFile = async (file: any) => {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
        const binaryStr = reader.result;
        const dataJson = csvjson.toObject(binaryStr);
        console.log(file);
        store.dispatch({
            type: UploadCsvActionTypes.SUCCESS,
            payload: transformToChart(dataJson)
        });
    };
    reader.readAsText(file[0], 'utf8');
};

const transformToChart = (dataJson: any[]) => {
    let newData: ChartData[] = [];

    Object.keys(dataJson[0]).forEach(key => {});

    for (let index = 0; index < Object.keys(dataJson[0]).length; index++) {
        let newItem: ChartData = {
            id: Object.keys(dataJson[0])[index],
            data: []
        };

        newData.push(newItem);
    }
    newData.shift();
    let increment = 100;
    newData.forEach(newItem => {
        dataJson.forEach(oldItem => {
            let chartCoords: ChartCoords = {
                x: oldItem[Object.keys(oldItem)[0]],
                y: oldItem[newItem.id]
            };

            newItem.data.push(chartCoords);
        });
    });

    console.log(newData);
    return { newData, legendY: '', legendX: Object.keys(dataJson[0])[0] };
};

export default parseCsvFile;
