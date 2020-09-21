import React, { useEffect, useRef } from 'react';

import { useThemeContext } from "shared/utils/theme";

import styles from "./PopMenu.module.css";

function PopMenu({ options }) {
    
    const { dark } = useThemeContext();

    return (
        <ul
        className={`
        ${styles["popmenu"]}
        ${styles["popmenu--light"]}
        `}
        >
        {
            options.map(o => (
                <li
                key={`popmenu-options-${o.name}`}
                onMouseDown={o.onClick}
                className={`${styles["popmenu__item"]}`}
                >
                {o.label}
                </li>
            ))
        }
        </ul>
    )
}

export default PopMenu;
