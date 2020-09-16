import React from "react";
import styles from "./styles.module.css";

function SpinningVinyl({ mute, songImage }) {

  return (
    <div
      className={styles["music-controls__vinyl__player-disk"]}
      style={{
        animationPlayState: !mute ? "running" : "paused",
        backgroundImage: `url(${songImage ? songImage.default.url : null})`,
      }}
    >
      <i />
    </div>
  );
}

export default SpinningVinyl;
