import React, { useState } from "react";
import PropTypes from "prop-types";

import { textStyles } from "shared/styles";
import styles from "./styles.module.css";

function MessageInput(props) {
  const { placeholder, onEnter, ...rest } = props;

  const [text, setText] = useState("");

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter" && text !== "") {
      e.preventDefault();
      e.stopPropagation();
      const { value } = e.target;
      onEnter(value);
      setText("");
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;

    setText(value);
  };

  return (
    <div
      className={`${styles["message-input"]} ${styles["message-input__input--default"]}`}
    >
      <input
        className={`
            ${textStyles["text-5"]}
            ${styles["message-input__input"]} 
            ${styles["message-input__input--default"]}`}
        placeholder={placeholder}
        onKeyPress={handleOnKeyPress}
        onChange={handleOnChange}
        value={text}
        {...rest}
        type={"text"}
      />
    </div>
  );
}

MessageInput.propTypes = {
  onEnter: PropTypes.func.isRequired,
};

export default MessageInput;
