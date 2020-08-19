import React, { useState } from 'react';

import { textStyles } from "shared/styles";
import styles from "./styles.module.css";

function TextArea() {

    const [ text, setText ] = useState("");

    const handleOnChange = (e) => {
        console.log(e);
    }
    
    return (
        <div className={`${styles["textarea"]} ${styles["textarea--white"]}`}>
            <div
            onChange
            contentEditable={true} 
            className={`${styles["textarea__input-container"]} 
            ${textStyles["text-5"]}
            ${styles["textarea__input-container--default"]}`}>
                {
                    (text === "") && (
                        <div>
                            Enter Text Here
                        </div>
                    )
                }
                {
                    (!text === "") && (
                        {text}
                    )
                }
            </div>
        </div>
    )
}

export default TextArea;
