import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress"; 
import styles from "./LoaderPage.module.css";

function LoaderPage() {
    return (
        <div className={styles["loaderpage-container"]}>
            <div className={styles["loaderpage-center-box box-center"]}>            
                <CircularProgress/>
            </div>
        </div>
    )
    
}

export default LoaderPage;
