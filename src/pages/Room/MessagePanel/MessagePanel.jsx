import React from 'react'

import MessageChat from "./MessageChat";
import { TextArea } from "shared/components";
import styles from "./styles.module.css";

function MessagePanel() {
    return (
        <div className={`${styles["message-panel"]} box-column`}>
            <div className={`${styles["message-panel__messages"]}`}>
                <MessageChat/>
            </div>
            <div className={`${styles["message-panel__input"]}`}>
                <TextArea/>
            </div>
        </div>
    )
}

export default MessagePanel;
