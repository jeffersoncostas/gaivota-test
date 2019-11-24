import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
export default function RootRouting() {
    return (
        <Router>
            <Switch>

                <Route path="/" exact >
                    <Redirect to="/home" />
                </Route>

                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />

            </Switch>

        </Router>
    )
}
