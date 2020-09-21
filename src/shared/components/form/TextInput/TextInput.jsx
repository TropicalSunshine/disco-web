import React from 'react'
import PropTypes from "prop-types";

import { useThemeContext } from "shared/utils/theme";

import styles from "./Text.module.css";
import inputStyles from "../Inputs.module.css";

function TextInput({ label, id, Icon, ...rest}) {

    const { dark } = useThemeContext();

    return (
        <div className={`
        ${styles["text"]}
        ${(dark) ? inputStyles["light"] : inputStyles["dark"]}
        `}>
            <label
            htmlFor={id}
            className={`
            ${styles["text__label"]}
            ${inputStyles["input-label"]}`}
            >{label}</label>
            <div className={`
            ${styles["text__input-container"]}
            ${inputStyles["input-outline"]}
            ${(dark) ? inputStyles["input-outline--light"] : inputStyles["input-outline--dark"]}
            `}>
            <div className={`
                box-center 
                ${styles["text__input-container__icon"]}
                `
                }>
                <Icon
                className={`${(dark) ? inputStyles["input-outline--light"] : inputStyles["input-outline--dark"]}`}
                />
            </div>
            <input
            {...rest}
            className={`
            ${(dark) ? inputStyles["light"] : inputStyles["dark"]}
            ${inputStyles["input-box"]}
            ${styles["text__input-container__input"]}
            `}
            id={id}
            type="text"
            />
            </div>
        </div>
    )
}

TextInput.propTypes = {
    label : PropTypes.string,
    id : PropTypes.string,
    Icon : PropTypes.elementType.isRequired
}

TextInput.defaultProps = {
    label : "",
    id : ""
}



export default TextInput;
