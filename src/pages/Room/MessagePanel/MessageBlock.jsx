import React, { forwardRef, useMemo} from "react";

import { UserProfileIcon } from "shared/components";
import { textStyles } from "shared/styles";
import styles from "./styles.module.css";

function MessageBlock ({ message, user }, ref) {

    const { content, time_created } = message;
    const messageDate = useMemo(() => {
        return new Date(time_created);
    }, [time_created]);

    return (
        <li 
        className={`
        ${styles["message-box"]} 
        ${styles["message-box--default"]} 
        box-row`
        } 
        ref={ref}>
            <div className={` ${styles["message-box__user_icon"]}`}>
                <UserProfileIcon height={"30px"}/>
            </div>
            <div className={`
            ${styles["message-box__message-content"]}
            box-column`}>
                <div>
                    <span className={`
                        ${textStyles["text-4"]}
                        ${styles["message-box__username"]}
                    `}>
                        {user.username}
                    </span>
                    <span className={`
                        ${styles["message-box__timestamp--default"]}
                        ${styles["message-box__timestamp"]}
                        ${textStyles["text-5"]}
                    `}>
                        {`${messageDate.toLocaleDateString()} ${messageDate.toLocaleTimeString()}`}
                    </span>
                </div>
                <div 
                className={`${styles["message-box__content"]} 
                ${textStyles["text-5"]}`}>
                    {content}
                </div>
            </div>
        </li>
    )
};

export default forwardRef(MessageBlock);