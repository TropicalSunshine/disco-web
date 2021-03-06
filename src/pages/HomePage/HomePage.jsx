import React from "react";
import { Helmet } from "react-helmet"; 

import { HistoryPropTypes } from "shared/types";
import { Button } from "@material-ui/core";

import styles from "./styles.module.css";
import discoImage from "static/images/discoball.png";


function HomePage({ auth }){

    return (
        <div className={styles["main-container"]}>
            <Helmet>
                <title>Disco</title>
            </Helmet>
            <section className={`${styles["title-section"]} box-row`}>
                <div className={`${styles["title-message"]}`}>
                    <span>Jam to </span>
                    <span>music together</span>
                    <Button variant="contained" color="primary">
                        Start Jamming (doesnt do anything)
                    </Button>
                </div>
                <div className={styles["title-img"]}>
                    <img
                    loading="lazy" 
                    src={discoImage} 
                    alt="disco-ball" 
                    height="300" 
                    width="300"/> 
                </div>
            </section>

        </div>
    )

}   


HomePage.propTypes = {
    ...HistoryPropTypes
}

export default HomePage;