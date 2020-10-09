import React from 'react'
import PropTypes from "prop-types";
import { textStyles } from "shared/styles";
import styles from "./Message.module.css";

function Message({ message }) {
    return (
        <div className={`${styles["message"]}`} >
            <h1 className={textStyles["text-3"]}>
                { message }
            </h1>
        </div>
    )
}

Message.propTypes = {
    message : PropTypes.string.isRequired
}

export default Message;
