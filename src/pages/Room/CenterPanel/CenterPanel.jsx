import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { UserProfileIcon } from "shared/components";
import { textStyles } from "shared/styles";
import styles from "./CenterPanel.module.css";

function CenterPanel({members, currentDj, 
                    initialDjs, room}) {
    const history = useHistory();

    const [ djs, setDjs ] = useState([1, 2, 3]);
    console.log(room);
    const handleBackClick = () => {
        history.go(-1);
    }

    return (
        <div className={`${styles["center-panel"]} box-column`}>
            <header className={`${styles["center-panel__navbar"]} box-row`}>
                <div
                className={`box-row 
                ${styles["center-panel__navbar__back-button"]}
                ${textStyles["text-4"]}`}
                onClick={handleBackClick}
                >
                    <p><ArrowBackIcon /></p>
                    <p>Back</p>
                </div>
                <div className={`
                box-center
                ${styles["center-panel__navbar__user-icon"]}`}>
                    <UserProfileIcon
                        height={"40px"}
                    />
                </div>
            </header>
            <div className={`box-center
            ${styles["center-panel__navbar__room-info"]}`}>
                <h1>{room.name}</h1>
            </div>
            <div className={`box-row box-center
            ${styles["center-panel__dj-booth"]}`}>
                {
                    djs.map(dj => {
                        return (
                            <div className={`
                            ${styles["center-panel__dj-booth__dj-icon--playing"]}
                            ${styles["center-panel__dj-booth__dj-icon"]}`}>
                                <UserProfileIcon
                                    height={"100px"}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default CenterPanel;
