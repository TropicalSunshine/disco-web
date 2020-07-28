import React, { PureComponent, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Spinner } from "shared/components/index";

const Room = lazy(() => import("pages/Room"));
const Login = lazy(() => import("pages/Login"));

export default class Router extends PureComponent {

    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={<Spinner/>}>
                    <Switch>   
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/room/:id" component={Room}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}
