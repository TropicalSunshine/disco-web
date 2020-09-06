import React from "react";

import { useMusicRoom } from "shared/utils/musicRoom";

import styles from "./styles.module.css";
function SpinningVinyl(props){
    const { paused, songImage } = useMusicRoom();

    return (
        <div
        className={styles["music-controls__vinyl__player-disk"]}
        style={{
            animationPlayState: !paused ? "running" : "paused",
            backgroundImage: `url(${songImage.default.url})`,
        }}
        >
            <i />
        </div>
    )

}

export default SpinningVinyl;