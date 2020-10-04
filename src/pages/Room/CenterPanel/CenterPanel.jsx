import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useAuth } from "shared/context/auth";
import { useUser } from "shared/context/user";
import { UserProfileIcon } from "shared/components";
import { textStyles } from "shared/styles";

import { DEFAULT_USER } from "../DEFAULTS";
import attachCenterPanelListeners from "./attachCenterPanelListeners";

import styles from "./CenterPanel.module.css";

function CenterPanel({ members, currentDj, initialDjs, room }) {
    const history = useHistory();

    const [djs, setDjs] = useState(initialDjs);
    const [isStepUp, setIsStepUp] = useState(false);

    const { userId } = useAuth();
    const { user } = useUser();

    const setters = {
        setDjs,
        setIsStepUp
    };

    const {
        bind,
        unbind,
        emitStepDown,
        emitStepUp
    } = attachCenterPanelListeners(setters, userId);

    useEffect(() => {
        bind();

        return () => {
            unbind();
        }
    }, [bind, unbind]);

    const handleBackClick = () => {
        history.go(-1);
    }

    const handleStepUp = () => {
        emitStepUp();
        setIsStepUp(true);
        setDjs(prevArray => [...prevArray, userId]);
    }

    const handleStepDown = () => {
        emitStepDown();
        setIsStepUp(false);
        setDjs(prevDjs => prevDjs.filter(id => id !== userId));
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
                        label={(user.username) ? (user.username) : ""}
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
                            ${(dj === currentDj) ? styles["center-panel__dj-booth__dj-icon--playing"] : ""}
                            ${styles["center-panel__dj-booth__dj-icon"]}`}
                                key={dj}
                            >
                                <UserProfileIcon
                                    label={(members[dj] === undefined) ?
                                        DEFAULT_USER.username : members[dj].username}
                                    height={"100px"}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="box-center">
                {(!isStepUp) && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStepUp}
                    >
                        Step Up
                    </Button>
                )}
                {(isStepUp) && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleStepDown}
                    >
                        Step Down
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CenterPanel;
