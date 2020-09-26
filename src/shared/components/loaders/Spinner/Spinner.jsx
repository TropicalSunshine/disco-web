import React from 'react'

import useSpinnerStyles from "../shared/useSpinnerStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./styles.module.css";


function Spinner(props) {
    const classes = useSpinnerStyles();

    return (
        <div className={`${styles.spinner}`}>
            <div className="box-center"> 
                <div className={`${styles["spinner-container"]}`}>
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

export default Spinner;
