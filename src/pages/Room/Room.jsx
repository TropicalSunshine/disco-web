import React, { useEffect, useState } from "react";

import { LoaderPage } from "shared/components/index";

import MessagePanel from "./MessagePanel";
import MusicControls from "./MusicControls";
import SearchPanel from "./SearchPanel";

import { useParams } from "react-router-dom";

import styles from "./style.module.css";

function Room(props) {
  const { roomId } = useParams();
  const { musicRoom } = props;

  const [isLoading, setIsLoading] = useState(true);

  const { paused, songImage, join, leave } = musicRoom;

  const [loadingValue, setLoadingValue] = useState(0);

  /* eslint-disable */
  useEffect(() => {
    console.log(musicRoom);

    (async () => {
      setIsLoading(true);
      await join(roomId);
      setLoadingValue(100);

      setIsLoading(false);
    })();

    return () => {
      leave();
    };
  }, []);
  /* eslint-enable */

  return (
    <React.Fragment>
      {isLoading && <LoaderPage value={loadingValue} />}
      {!isLoading && (
        <div className={`box-row ${styles["room"]}`}>
          <div className={styles["room__room-left"]}>
            <SearchPanel />
          </div>
          <div className={`box-column ${styles["room__room-central"]}`}>
            <div className={`box-center ${styles["room__player-display-box"]}`}>
              <div
                className={styles["room__player-disk"]}
                style={{
                  animationPlayState: !paused ? "running" : "paused",
                  backgroundImage: `url(${songImage})`,
                }}
              >
                <i />
              </div>
            </div>
            <div className={styles["player-control-container"]}>
              <MusicControls />
            </div>
          </div>
          <div className={styles["room__room-right"]}>
            <MessagePanel />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Room;
