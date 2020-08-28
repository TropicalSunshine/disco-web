import React from "react";
import { withMusicRoomProvider } from "shared/utils/musicRoom";

import IconButton from "@material-ui/core/IconButton";
import { AddOutlined as AddIcon } from "@material-ui/icons";

import styles from "./styles.module.css";


function SearchResultBlock(props){
    
    const { musicRoom } = props;
    const {
        changeSong
    } = musicRoom;

    
    const v = props.value;
    const thumbnail = v.snippet.thumbnails.default;
    const snippet = v.snippet;

    return (
        <li className={`box-row ${styles["result"]}`}>
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
                        {snippet.title}
                    </p>
                    <p className={styles["result__desc__text__channel-name"]}>
                        {snippet.channelTitle}
                    </p>
                </div>
                <div className={`box-row ${styles["result__desc__button"]}`}>
                    <IconButton 
                    onClick={() => {
                        if(v.id.videoId) changeSong(v.id.videoId);
                        if(v.id) changeSong(v.id);
                        
                    }} 
                    color="primary">
                        <AddIcon/>
                    </IconButton>
                </div>
            </div>
        </li>
    )
}

export default withMusicRoomProvider(SearchResultBlock);