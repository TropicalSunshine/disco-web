import React, { useState } from 'react';
import PropTypes from "prop-types";

import { textStyles } from "shared/styles";
import styles from "./styles.module.css";

function TextArea({ onEnter }) {

    const [ text, setText ] = useState("");

    const handleOnKeyPress = (e) => {
        if(e.key === "Enter" && text !== ""){
            e.preventDefault();
            e.stopPropagation();
            const { value } = e.target;
            onEnter(value);
            setText("");
        }
    }

    const handleOnChange = (e) => {
        const { value } = e.target;

        setText(value);
    }

    
    return (
        <div className={`${styles["textarea"]} ${styles["textarea--white"]}`}>
            <textarea
            placeholder={"Send Message"}
            value={text}
            onChange={handleOnChange}
            onKeyPress={handleOnKeyPress}
            autoComplete="off"
            className={`${styles["textarea__input-container"]} 
            ${textStyles["text-5"]}
            ${styles["textarea__input-container--default"]}`}/>
        </div>
    )
}

TextArea.propTypes = {
    onEnter : PropTypes.func.isRequired
}

export default TextArea;
