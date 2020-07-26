import React, {Component} from 'react';


import Router from "./shared/utils/Router";
import ErrorBoudary from "./shared/utils/ErrorBoundary";

export default class App extends Component{
  render(){
    return (
      <ErrorBoudary>
        <Router/>
      </ErrorBoudary>
    )
  }
}

