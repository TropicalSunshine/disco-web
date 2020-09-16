import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress"; 
import styles from "./LoaderPage.module.css";

function LoaderPage() {
    return (
        <div className={styles["loaderpage-container"]}>
            <div className={`box-center ${styles["loaderpage-center-box"]}`}>            
                <CircularProgress/>
            </div>
        </div>
    )
    
}

export default LoaderPage;
