import React from "react";
import { useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { textStyles } from "shared/styles";
import styles from "./styles.module.css";

function CenterPanel() {
    const history = useHistory();
  
    const handleBackClick = () => {
        history.go(-1);
    }

    return (
        <div className={`${styles["center-panel"]} box-column`}>
        <header className={`${styles["center-panel__navbar"]} box-row`}>
            <div
            className={`box-row ${styles["center-panel__navbar__back-button"]}
            ${textStyles["text-4"]}`}
            onClick={handleBackClick}
            >
            <p>
                <ArrowBackIcon />
            </p>
            <p>Back</p>
            </div>
        </header>
        </div>
    );
}

export default CenterPanel;
