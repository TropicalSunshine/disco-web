import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Room = lazy(() => import("../pages/Room/Room.jsx"));
const Login = lazy(() => import("../pages/Login/Login.jsx"));

export default class Router extends Component {

    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={(
                    <div>Loading...</div>
                )}>
                    <Switch>   
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/room/:id" component={Room}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}
