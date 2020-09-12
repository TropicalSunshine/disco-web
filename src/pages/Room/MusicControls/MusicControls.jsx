import React, { useEffect, useState } from "react";

import { YoutubePlayer } from "shared/utils/services";
import SpinningVinyl from "./SpinningVinyl";

import { textStyles } from "shared/styles";

import VolumeUpIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeOffIcon from "@material-ui/icons/VolumeOffRounded";
import FastForwardIcon from "@material-ui/icons/FastForwardSharp";
import FastRewindIcon from "@material-ui/icons/FastRewindSharp";

import styles from "./styles.module.css";
/*

props req
    
    handlePlay
    handleNext
    handlePrev

*/

function MusicControls({ song }) {
  
  const [ mute, setMute ] = useState(false);
  const { songImage, songTitle, songArtist } = song;

  
  useEffect(() => {
    if(mute) {
      YoutubePlayer.mute();
    } else {
      YoutubePlayer.unMute();
    }
  }, [mute])
  
  const handleMute = () => {
    setMute(!mute);
  }
  
  return (
    <div className={`${styles["music-player-container"]} box-row`}>
      <div className={`box-row ${styles["music-controls__left"]}`}>
        <div className={`${styles["music-controls__vinyl__image"]}`}>
          <SpinningVinyl 
            songImage={songImage}
            mute={mute}
          />
        </div>
        <div
          className={` 
          ${styles["music-controls__vinyl__song-info"]}`}
        >
          <p
            className={`${textStyles["text-ellipsis"]} 
              ${textStyles["text-4"]}`}
          >
            {songTitle}
          </p>
          <p
            className={`${textStyles["text-ellipsis"]}
               ${textStyles["text-5"]}`}
          >
            {songArtist}
          </p>
        </div>
      </div>
      <div className={`box-center ${styles["music-controls__center"]}`}>
        <div
          className={`${styles["music-player-control-button"]} 
          ${styles["rewind-button"]}`}
        >
          <FastRewindIcon className={`${styles.icon}`} />
        </div>
        <div
          className={`${styles["music-player-control-button"]} 
                ${styles["play-button"]}`}
          onClick={handleMute}
        >
          {mute && <VolumeUpIcon className={`${styles.icon}`} />}
          {!mute && <VolumeOffIcon className={`${styles.icon}`} />}
        </div>
        <div
          className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}
        >
          <FastForwardIcon className={`${styles.icon}`} />
        </div>
      </div>
      <div className={`${styles["music-controls__right"]}`}>
        <i />
      </div>
    </div>
  );
}

export default MusicControls;
