import React, { forwardRef, useMemo} from "react";

import { textStyles } from "shared/styles";
import styles from "./styles.module.css";

const MessageBlock = forwardRef(({ message }, ref) => {

    const { content, time_created } = message;
    const messageDate = useMemo(() => {
        return new Date(time_created);
    }, [time_created]);

    return (
        <li className={`${styles["message-box"]} ${styles["message-box--default"]} box-column`} ref={ref}>
            <div className={`
            ${styles["message-box__timestamp--default"]}
            ${styles["message-box__timestamp"]} 
            ${textStyles["text-5"]}`}>
                {`${messageDate.toLocaleDateString()} ${messageDate.toLocaleTimeString()}`}
            </div>
            <div className={`${styles["message-box__content"]} ${textStyles["text-5"]}`}>
                {content}
            </div>
        </li>
    )
});

export default MessageBlock;