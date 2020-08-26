import React from 'react';
import styles from "./styles.module.css";

import PlayIcon from "@material-ui/icons/PlayArrowSharp"
import PauseIcon from "@material-ui/icons/PauseSharp";
import FastForwardIcon from "@material-ui/icons/FastForwardSharp";
import FastRewindIcon from "@material-ui/icons/FastRewindSharp";


/*

props req
    
    handlePlay
    handleNext
    handlePrev
 */

function MusicControls(props){

    const { musicRoom } = props;

    const {
        paused,
        pause,
        play
    } = musicRoom;


    const handlePausePlay = () => {
        if(paused) {
            console.log("playing");
            play();
        } else {
            console.log("pausing");
            pause();
        } 
    }

    return (
        <div className={styles["music-player-container"]}>
            <div className="box-center">
                <div className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}>
                    <FastRewindIcon
                    className={`${styles.icon}`}
                    />
                </div>
                <div 
                className={`${styles["music-player-control-button"]} 
                ${styles["play-button"]}`}
                onClick={handlePausePlay}
                >
                    {
                        (paused) &&
                        (
                            <PlayIcon 
                            className={`${styles.icon}`}
                            />
                        )
                    }
                    {
                        (!paused) && (
                            <PauseIcon
                            className={`${styles.icon}`}
                            />
                        )
                    }
                </div>
                <div className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}>
                    <FastForwardIcon
                    className={`${styles.icon}`}
                    />
                </div>
            </div>
        </div>
    )
}

export default MusicControls;

