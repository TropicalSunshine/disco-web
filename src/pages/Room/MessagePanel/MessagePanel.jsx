import React from 'react'


import { TextArea } from "shared/components";
import styles from "./styles.module.css";

function MessagePanel() {


    const onMessageEnter = (content) => {
        console.log(content);
    }

    return (
        <div className={`${styles["message-panel"]} box-column`}>
            <div className={`${styles["message-panel__messages"]}`}>
                <p>asd</p>
            </div>
            <div className={`${styles["message-panel__input"]}`}>
                <TextArea
                onEnter={onMessageEnter}
                />
            </div>
        </div>
    )
}

export default MessagePanel;
