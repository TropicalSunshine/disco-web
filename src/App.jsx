import React, {Component} from 'react';




import './App.css';

import Router from "./utils/Router";
import ErrorBoudary from "./utils/ErrorBoundary";

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

