import React, { Component } from 'react';


import Router from "shared/utils/Router";
import ErrorBoudary from "shared/utils/ErrorBoundary";
import ToastContainer from "shared/utils/ToastContainer";

export default class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <ErrorBoudary fallback={() => (<h1>Something Went Wrong</h1>)}>
          <ToastContainer />
          <Router />
        </ErrorBoudary>
      </React.StrictMode>
    )
  }
}

