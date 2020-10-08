import React from 'react'

import Spinner from "../Spinner"; 
import styles from "./LoaderPage.module.css";


function LoaderPage() {
    return (
        <div className={styles["loaderpage-container"]}>
            <div 
            className={`box-center ${styles["loaderpage-center-box"]}`}>   
                <Spinner/>       
            </div>
        </div>
    )
    
}

export default LoaderPage;
