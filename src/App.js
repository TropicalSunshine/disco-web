import React, {Component} from 'react';
import logo from './logo.svg';


import MainPlayer from "./components/MainPlayer";

import './App.css';
import "./css/component.css";
import "./css/global.css";

import {connect} from "./network";
import {downloadAssets} from "./assets";

export default class App extends Component{
  constructor(){
    super();

    this.state = {
      dependenciesLoaded: false
    }
  }

  componentDidMount(){


    //complete connections before anything

    Promise.all([
      connect,
      downloadAssets
    ]).then(() => {
      this.setState({
        dependenciesLoaded: true
      })
    })
  
  }


  render(){

    var AppContent = this.state.dependenciesLoaded && (
      <div className = "App">
        <MainPlayer/>
      </div>
    )
    
    return (
      <div>
        {AppContent}
      </div>
    )
  }
}

