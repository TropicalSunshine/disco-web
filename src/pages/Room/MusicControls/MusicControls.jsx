import React, { useEffect, useState } from "react";

import { YoutubePlayer } from "shared/utils/services";
import SpinningVinyl from "./SpinningVinyl";
import VolumeSlider from "./VolumeSlider";

import { textStyles } from "shared/styles";

import VolumeUpIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeOffIcon from "@material-ui/icons/VolumeOffRounded";
import ThumbDownIcon from "@material-ui/icons/ThumbDownRounded";
import ThumbUpIcon from "@material-ui/icons/ThumbUpRounded";

import styles from "./styles.module.css";
/*

props req
    
    handlePlay
    handleNext
    handlePrev

*/

function MusicControls({ song }) {

  const [mute, setMute] = useState(false);
  const { songImage, songTitle, songArtist } = song;


  useEffect(() => {
    if (mute) {
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
        <div className={`${styles["music-controls__left__vinyl"]} box-center`}>
          <SpinningVinyl
            songImage={songImage}
            mute={mute}
          />
        </div>
        <div
          className={` 
          ${styles["music-controls__left__song-info"]}`}
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
          <ThumbDownIcon className={`${styles.icon}`} />
        </div>
        <div
          className={`${styles["music-player-control-button"]} 
                ${styles["play-button"]}`}
          onClick={handleMute}
        >
          {mute &&  <VolumeOffIcon className={`${styles.icon}`} />}
          {!mute && <VolumeUpIcon className={`${styles.icon}`} />}
        </div>
        <div
          className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}
        >
          <ThumbUpIcon className={`${styles.icon}`} />
        </div>
      </div>
      <div className={`box-center ${styles["music-controls__right"]}`}>
        <VolumeSlider />
      </div>
    </div>
  );
}

export default MusicControls;
