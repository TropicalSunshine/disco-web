import React from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import styles from "./SongItem.module.css";



function SongItem({ value, actions }){

    
    const { 
        songImage,
        songTitle,
        songArtist
    } = value;

    const thumbnail = songImage.default; 

    return (
        <li className={`box-row ${styles["result-block"]} ${styles["result"]}`}>
            <div className={styles["result__img"]}
            >
                <img
                alt={"thumbnail"}
                src={thumbnail.url}
                width={thumbnail.width}
                height={thumbnail.height}
                />
            </div>
            <div className={`${styles["result__desc"]} box-row`}>
                <div className={`box-column ${styles["result__desc__text"]}`}>
                    <p className={styles["result__desc__text__title"]}>
                        {songTitle}
                    </p>
                    <p className={styles["result__desc__text__channel-name"]}>
                        {songArtist}
                    </p>
                </div>
                {
                    actions.map( a => {
                        var { Icon } = a;
                        
                        return (
                            <div className={`box-row ${styles["result__desc__button"]}`}>
                                <IconButton 
                                onClick={a.onClick} 
                                color="primary">
                                    <Icon/>
                                </IconButton>
                            </div>
                        );
                    })   
                }      
            </div>
        </li>
    )
}

SongItem.propTypes = {
    value : PropTypes.shape({
        songImage : PropTypes.object.isRequired,
        songTitle : PropTypes.string.isRequired,
        songArtist : PropTypes.string.isRequired
    }).isRequired,
    actions : PropTypes.arrayOf(PropTypes.shape({
        icon : PropTypes.elementType.isRequired,
        onClick : PropTypes.func.isRequired
    })).isRequired
}


export default SongItem;