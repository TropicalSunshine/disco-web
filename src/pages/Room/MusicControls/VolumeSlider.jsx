import React, { useState } from 'react';

import Slider from "@material-ui/core/Slider";
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

import { YoutubePlayer } from "shared/utils/services";
import styles from "./styles.module.css";

function VolumeSlider() {

    const [ volume, setVolume ] = useState(YoutubePlayer.isInitialized() ? YoutubePlayer.getVolume() : 50);


    const onDragFinish = (e, val) => {
        YoutubePlayer.setVolume(val);
    }

    const changeVolume = (val) => {
        YoutubePlayer.setVolume(val);
        setVolume(val);
    }
    
    return (
        <div className={`box-row ${styles["volume-slider"]}`}>
            <div 
            className={styles["volume-slider__icon"]}
            onClick={() => {
                changeVolume(0);
            }}
            >
                <VolumeDown/>
            </div>
            <div className={styles["volume-slider__input"]}>
                <Slider
                min={0}
                max={100}
                onChangeCommitted={onDragFinish}
                onChange={(e, val) => {
                    setVolume(val);
                }}
                value={volume}
                />            
            </div>
            <div 
            className={styles["volume-slider__icon"]}
            onClick={() => {
                changeVolume(100);
            }}
            >
                <VolumeUp/>
            </div>
        </div>
    )
};

export default VolumeSlider;
