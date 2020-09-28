import React from 'react'
import PropTypes from "prop-types";

import { convertStringToColor } from "shared/styles/colors";

import styles from "./styles.module.css";

function UserProfileIcon({ height, label }) {


    return (
        <div className={`${styles["user-profile"]}`}
            style={{
                height: height,
                width: height
            }}
        >
            <div
                className={`
                ${styles["user-profile__circle"]}
                ${styles["user-profile__circle--default"]}
                `}
                style={{
                    backgroundColor: convertStringToColor(label)
                }}
            >
                <i />
            </div>
        </div>
    );
};

UserProfileIcon.propTypes = {
    height: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};


export default UserProfileIcon;
