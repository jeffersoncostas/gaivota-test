import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../components/App';

export default function RootRouting() {
    <Router>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </Router>;
}
