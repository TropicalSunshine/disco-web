import React from "react";
import { withMusicRoomProvider } from "shared/utils/musicRoom";

import IconButton from "@material-ui/core/IconButton";
import { SearchOutlined as SearchIcon, 
    AddOutlined as AddIcon,
    FavoriteOutlined as FavoriteIcon } from "@material-ui/icons";

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
        <li className={`box-row ${styles["result-block"]}`}>
            <div className={styles["result-img-container"]}
            >
                <img
                src={thumbnail.url}
                width={thumbnail.width}
                height={thumbnail.height}
                />
            </div>
            <div className={`${styles["result-desc-container"]} box-row`}>
                <div className={`box-column ${styles["result-desc-text"]}`}>
                    <p style={{
                        overflow: "hidden",
                        fontSize: "10pt",
                        marginTop: "5px",
                        marginBottom: "5px"
                    }}>{snippet.title}</p>
                    <p style={{
                        fontSize: "6.5pt",
                        marginTop: "5px"
                    }}>{snippet.channelTitle}</p>
                </div>
                <div className={`box-row ${styles["result-desc-button"]}`}>
                    <IconButton 
                    onClick={() => {
                        changeSong(v.id.videoId);
                    }} 
                    color="primary">
                        <AddIcon/>
                    </IconButton>
                </div>
                <div className={`box-row ${styles["result-desc-button"]}`}>
                    <IconButton 
                    onClick={() => {
                        changeSong(v.id.videoId);
                    }} 
                    color="secondary">
                        <FavoriteIcon/>
                    </IconButton>
                </div>
            </div>
        </li>
    )
}

export default withMusicRoomProvider(SearchResultBlock);