import React, { PureComponent } from 'react'
import PropTypes from "prop-types";
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

    return (
        <div className={styles["music-player-container"]}>
            <div className="box-center">
                <div className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}>
                    <FastRewindIcon
                    className={`${styles.icon}`}
                    />
                </div>
                <div className={`${styles["music-player-control-button"]} ${styles["play-button"]}`}>
                    {
                        (paused) &&
                        (
                            <PlayIcon 
                            className={`${styles.icon}`}
                            onClick={()=>{
                                play();
                            }}
                            />
                        )
                    }
                    {
                        (!paused) && (
                            <PauseIcon
                            className={`${styles.icon}`}
                            onClick={() => {
                                pause();
                            }}
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

