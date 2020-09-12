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
  const { join, leave, isConnected } = musicRoom;

  const [isLoading, setIsLoading] = useState(true);

  const [membersMap, setMembersMap] = useState({});

  /* eslint-disable */
  useEffect(() => {

    (async () => {
      setIsLoading(true);

      if(!isConnected){
        const roomData = await join(roomId);
        console.log(roomData);

        const members = roomData.members;

        var map = {};
        for(var m of members){
          map[m._id] = m;
        }
        console.log(map);

        setMembersMap(map);
      }

      setIsLoading(false);
    })();

    return () => {
      leave(roomId); //change this later useEffect is not async 
      //ref: https://dev.to/n1ru4l/homebrew-react-hooks-useasynceffect-or-how-to-handle-async-operations-with-useeffect-1fa8#:~:text=An%20async%20function%20always%20returns,changes%20or%20the%20component%20unmounts.
    };

  }, []);
  /* eslint-enable */

  return (
    <React.Fragment>
      {isLoading && <LoaderPage/>}
      {!isLoading && (
        <>
          <div className={`${styles["room"]}`}>
            <div className={`box-row ${styles["room__room-main"]}`}>
              <div className={styles["room__room-left"]}>
                <SearchPanel />
              </div>
              <div className={`box-column ${styles["room__room-central"]}`}>
                <CenterPanel
                  members={membersMap}
                />
              </div>
              <div className={styles["room__room-right"]}>
                <MessagePanel 
                  members={membersMap}
                />
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
