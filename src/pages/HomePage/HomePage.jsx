import React, { Component } from "react";
import { HistoryPropTypes } from "shared/types";
import { Button } from "@material-ui/core";

import styles from "./styles.module.css";
import discoImage from "static/images/discoball.png";


class HomePage extends Component{

    render(){
        return (
            <div className={styles["main-container"]}>
                <section className={`${styles["title-section"]} box-row`}>
                    <div className={`${styles["title-message"]}`}>
                        <span>Jam to </span>
                        <span>music together</span>
                        <Button variant="contained" color="primary">
                            Start Jamming
                        </Button>
                    </div>
                    <div className={styles["title-img"]}>
                        <img src={discoImage} alt="" height="300" width="300"/> 
                    </div>
                </section>

            </div>
        )
    }
}   


HomePage.propTypes = {
    ...HistoryPropTypes
}

export default HomePage;