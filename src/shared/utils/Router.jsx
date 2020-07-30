import React, { PureComponent, Suspense, lazy } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spinner } from "shared/components/index";

import Navbar from "pages/Navbar";

const Room = lazy(() => import("pages/Room"));
const Login = lazy(() => import("pages/Login"));

export default class Router extends PureComponent {

    render() {
        return (
    
        <BrowserRouter>
            <Suspense fallback={<Spinner/>}>
                <div>
                    <Navbar/>
                    <Switch>   
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/room/:id" component={Room}/>
                    </Switch>
                </div>
            </Suspense>
        </BrowserRouter>
            
        )
    }
}
