import React, { useEffect, useState } from "react";

import { LoaderPage } from "shared/components/index";

import MessagePanel from "./MessagePanel";
import MusicControls from "./MusicControls";
import SearchPanel from "./SearchPanel";
import CenterPanel from "./CenterPanel";

import { useParams } from "react-router-dom";

import styles from "./style.module.css";

function Room(props) {
  const { roomId } = useParams();
  const { musicRoom } = props;
  const { paused, songImage, join, leave } = musicRoom;

  const [isLoading, setIsLoading] = useState(true);
  const [loadingValue, setLoadingValue] = useState(0);

  /* eslint-disable */
  useEffect(() => {

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
        <>
          <div className={`${styles["room"]}`}>
            <div className={`box-row ${styles["room__room-main"]}`}>
              <div className={styles["room__room-left"]}>
                <SearchPanel />
              </div>
              <div className={`box-column ${styles["room__room-central"]}`}>
                <CenterPanel/>
              </div>
              <div className={styles["room__room-right"]}>
                <MessagePanel />
              </div>
            </div>

            <div className={styles["room__player-control-container"]}>
              <MusicControls />
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default Room;
