import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import FarmDetail from '../pages/FarmDetail';
import UploadChart from '../pages/UploadChart';

export default function RootRouting() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>

                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/farm-detail/:farmId" component={FarmDetail} />
                <Route path="/upload-chart" component={UploadChart} />
            </Switch>
        </Router>
    );
}
