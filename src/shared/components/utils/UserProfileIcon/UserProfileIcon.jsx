import React from 'react'
import PropTypes from "prop-types";

import styles from "./styles.module.css";

function UserProfileIcon({ height }) {
    
    return (
        <div className={`${styles["user-profile"]}`}
        style={{
            height : height,
            width : height
        }}
        >
            <div className={`${styles["user-profile__circle"]}`}>
                <i/>
            </div>
        </div>
    );
};

UserProfileIcon.propTypes = {
    height : PropTypes.string.isRequired
};


export default UserProfileIcon;
