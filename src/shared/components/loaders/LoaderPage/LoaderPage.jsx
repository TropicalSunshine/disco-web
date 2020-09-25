import React from 'react'

import useSpinnerStyles from "../shared/useSpinnerStyles";

import CircularProgress from "@material-ui/core/CircularProgress"; 
import styles from "./LoaderPage.module.css";


function LoaderPage(props) {
    const classes = useSpinnerStyles();
    
    return (
        <div className={styles["loaderpage-container"]}>
            <div 
            className={`box-center ${styles["loaderpage-center-box"]}`}>   
            <div className={`${styles["loaderpage-center-box__loader-container"]}`}>
                <CircularProgress
                    variant="determinate"
                    className={classes.bottom}
                    size={40}
                    thickness={2}
                    {...props}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    className={classes.top}
                    classes={{
                    circle: classes.circle,
                    }}
                    size={40}
                    thickness={2}
                    {...props}
                />
            </div>         
            </div>
        </div>
    )
    
}

export default LoaderPage;
