import React from 'react'
import PropTypes from "prop-types";
import { UserProfileIcon } from "shared/components";

import { textStyles } from "shared/styles";
import styles from "./MemberBlock.module.css";

function MemberBlock({ user }) {
    return (
        <li className={`${styles["member-block"]} box-row`}>
            <div className={`box-center ${styles["member-block__user-icon"]}`}>
                <UserProfileIcon
                    height="40px"

                />
            </div>
            <div className={`box-center 
            ${textStyles["text-3"]}
            ${styles["member-block__user-info"]}`}>
                <p>{user.username}</p>
            </div>
        </li>
    )
}

MemberBlock.propTypes = {
    user: PropTypes.object.isRequired
};

export default MemberBlock;
