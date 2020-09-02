import React, {Component} from 'react';


import Router from "shared/utils/Router/Router";
import ErrorBoudary from "shared/utils/ErrorBoundary";

export default class App extends Component{
  render(){
    return (
        <React.StrictMode>
          <ErrorBoudary>
            <Router/>
          </ErrorBoudary>
        </React.StrictMode>
    )
  }
}

