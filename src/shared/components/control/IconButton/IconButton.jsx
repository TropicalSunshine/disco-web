import React from "react";

import styles from "./styles.module.css";

function IconButton({children, onClick}){
    
    return (
        <div
        onClick={onClick} 
        className={styles.button}>
            {
                children
            }
        </div>
    )

}

export default IconButton;