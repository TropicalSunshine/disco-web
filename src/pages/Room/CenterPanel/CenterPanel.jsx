import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";

import { useAuth } from "shared/context/auth";
import { UserProfileIcon } from "shared/components";

import { DEFAULT_USER } from "../DEFAULTS";
import CenterPanelHeader from "./CenterPanelHeader";
import attachCenterPanelListeners from "./attachCenterPanelListeners";

import styles from "./CenterPanel.module.css";

function CenterPanel({ members, currentDj, initialDjs, room }) {

    const [djs, setDjs] = useState(initialDjs);
    const [isStepUp, setIsStepUp] = useState(false);


    const { userId } = useAuth();

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
            <CenterPanelHeader/>
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
                                key={`dj-booth-${dj}`}
                            >
                                <UserProfileIcon
                                    label={(members.get(dj) === undefined) ?
                                        DEFAULT_USER.username : members.get(dj).username}
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
