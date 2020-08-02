import React, { PureComponent, Suspense, lazy } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spinner } from "shared/components/index";

import Navbar from "pages/Navbar";
import { AuthProvider } from "shared/utils/auth";

const Room = lazy(() => import("pages/Room"));
const HomePage = lazy(() => import("pages/HomePage"));
const ExplorePage = lazy(() => import("pages/ExplorePage"));

export default class Router extends PureComponent {

    render() {
        return (
    
        <BrowserRouter>
            <Suspense fallback={<Spinner/>}>
                <div>
                    <AuthProvider>
                        <Navbar/>
                        <Switch>   
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/explore" component={ExplorePage}/> 
                            <Route exact path="/room/:id" component={Room}/>
                        </Switch>
                    </AuthProvider>
                </div>
            </Suspense>
        </BrowserRouter>
            
        )
    }
}
