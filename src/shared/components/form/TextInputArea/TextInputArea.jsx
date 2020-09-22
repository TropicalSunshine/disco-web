import React from 'react';
import PropTypes from "prop-types";

import inputStyles from "../Inputs.module.css";
import styles from "./TextInputArea.module.css";


function TextInputArea({ label, dark, id, ...rest }) {

    return (
        <div
        className={`
        ${styles["text-input-area"]}
        ${(!dark) ? inputStyles["light"] : inputStyles["dark"]}
        `}
        >
            <label 
            htmlFor={id}
            className={`
            ${styles["text-input-area__label"]}
            ${inputStyles["input-label"]}
            ${(!dark) ? inputStyles["light"] : inputStyles["dark"]}

            `}
            >{label}</label>
            <div
            className={`
            ${styles["text-input-area__container"]}
            ${inputStyles["input-outline"]}
            ${(!dark) ? inputStyles["input-outline--light"] : inputStyles["input-outline--dark"]}
            `}
            >
                <textarea
                id={id}
                
                className={`
                ${styles["text-input-area__input"]}
                ${(!dark) ? inputStyles["light"] : inputStyles["dark"]}
                ${inputStyles["input-box"]}
                `}
                {...rest}
                />
            </div>
            
        </div>
    )
}

TextInputArea.propTypes = {
    label : PropTypes.string,
    id : PropTypes.string,
    dark : PropTypes.bool.isRequired
}

export default TextInputArea;
