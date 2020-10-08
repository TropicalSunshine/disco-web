import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./styles.module.css";


const useSpinnerStyles = makeStyles(() => ({
    bottom: {
        color: "var(--white)",
      },
      top: {
        color: 'var(--blue)',
        animationDuration: '750ms',
        position: 'absolute',
        left : 0
      },
      circle: {
        strokeLinecap: 'round',
        strokeDasharray: "30 200"
      }
}));


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
