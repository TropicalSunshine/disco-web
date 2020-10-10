import React from 'react'; 

import styles from "./Logo.module.css";

function Logo() {
    return (
        <h1
        className={styles.logo}
        >
            <span className="light-blue">d</span>
            <span className="purple">i</span>
            <span className="pink">s</span>
            <span className="yellow">c</span>
            <span className="aqua">o</span>
        </h1>
    )
}

export default Logo;
