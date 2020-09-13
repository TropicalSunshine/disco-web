import React, { useState } from 'react'
import PropTypes from "prop-types";

import { textStyles } from "shared/styles";
import styles from "./PanelTabs.module.css";

const OPTIONS = [
    {
        name : "Search"
    },
    {
        name : "Queue"
    }
]

function PanelTabs({ onChange, options, defaultTab }) {

    const [ tab, setTab ] = useState(defaultTab);

    const handleSelect = (i, name) => {
        setTab(i);
        onChange(i, name);
    }
    
    return (
        <div className={`box-row ${styles["tab-container"]}`}>
            {
                options.map( (o, i) => (
                    <div 
                    className={`
                    ${styles["tab-container__item"]}
                    ${(tab === i) ? styles["tab-container__item--selected"] : styles["tab-container__item--default"]}
                    `}
                    onClick={() => {
                        handleSelect(i, o.name);
                    }}
                    >
                        <p className={textStyles["text-4"]}>
                            {o.name}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

PanelTabs.propTypes = {
    onChange : PropTypes.func.isRequired,
    options : PropTypes.arrayOf(PropTypes.shape({
        name : PropTypes.string.isRequired
    })).isRequired,
    defaultTab : PropTypes.number
};

PanelTabs.defaultProps = {
    defaultTab : 0
};

export default PanelTabs;
