import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PersonAddIcon from "@material-ui/icons/PersonAddRounded";
import IconButton from "@material-ui/core/IconButton";

import { clipboard } from "shared/utils/navigator";
import { useUser } from "shared/context/user";
import { UserProfileIcon } from "shared/components";

import { textStyles } from "shared/styles";

import styles from "./CenterPanel.module.css";

const useIconStyles = makeStyles(() => ({
    root : {
        color: "var(--white)"
    }
})) 

function CenterPanelHeader() {

    const history = useHistory();
    const { user } = useUser();

    const iconStyles = useIconStyles();

    const handleBackClick = () => history.push("/explore");

    const copyRoomInvite = async () => {
        const { href } = window.location;
        await clipboard.write(href);
    }

    return (
        <header className={`${styles["center-panel__navbar"]} box-row`}>
            <div
                className={`box-row 
            ${styles["center-panel__navbar__back-button"]}
            ${textStyles["text-4"]}`}
                onClick={handleBackClick}
            >
                <p><ArrowBackIcon /></p>
                <p>Leave</p>
            </div>
            <div className={`
            box-center
            ${styles["center-panel__navbar__icon"]}
            `}>
                <IconButton
                onClick={copyRoomInvite}
                >
                    <PersonAddIcon
                        classes={{
                            root:iconStyles.root
                        }}
                    />
                </IconButton>
            </div>
            <div className={`
            box-center
            ${styles["center-panel__navbar__icon"]}`}>
                <UserProfileIcon
                    label={(user.username) ? (user.username) : ""}
                    height={"40px"}
                />
            </div>
        </header>
    )
}

export default CenterPanelHeader;
