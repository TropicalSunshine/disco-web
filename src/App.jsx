import React, {Component} from 'react';




import './App.css';

import Router from "./shared/utils/Router";
import ErrorBoudary from "./shared/utils/ErrorBoundary";

export default class App extends Component{
  constructor(){
    super();
  }



  render(){

    
    return (
      <ErrorBoudary>
        <Router/>
      </ErrorBoudary>
    )
  }
}

