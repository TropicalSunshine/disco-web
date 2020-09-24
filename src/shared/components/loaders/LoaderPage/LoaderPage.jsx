import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress"; 
import styles from "./LoaderPage.module.css";


// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles(() => ({
    root: {
      position: 'relative',
    },
    bottom: {
      color: "var(--text-muted)",
    },
    top: {
      color: 'var(--blue)',
      animationDuration: '900ms',
      position: 'absolute',
      left : 0
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));

function LoaderPage(props) {
    const classes = useStylesFacebook();
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
