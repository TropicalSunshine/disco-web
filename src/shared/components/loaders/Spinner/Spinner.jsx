import React, { Component } from 'react'

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./styles.module.css";


const StyledCircularProgress = withStyles({
    colorPrimary: {
        color: "var(--white)"
    }
})(CircularProgress);

export default class Spinner extends Component {
    render() {
        return (
            <div className={`${styles.spinner}`}>
                <div className={`${styles["spinner-container"]}`}>
                    <StyledCircularProgress disableShrink={true}/>                
                </div>
            </div>
        )
    }
}
