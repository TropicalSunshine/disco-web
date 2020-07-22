import React, { Component } from 'react'

import "./Spinner.css";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Spinner extends Component {
    render() {
        return (
            <div className="spinner">
                <div className="spinner-container">
                    <CircularProgress/>                
                </div>
            </div>
        )
    }
}
