import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from "shared/context/user";
import styles from "./PopMenu.module.css";

function PopMenu({ options }) {
    const { user } = useUser();
    console.log(user.username);
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
