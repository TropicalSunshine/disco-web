import React, { useEffect, useState } from "react";

import { LoaderPage } from "shared/components/index";

import { DEFAULT_SONG } from "./DEFAULTS";
import useAttachRoomListeners from "./hooks/useAttachRoomListeners";

import MessagePanel from "./MessagePanel";
import MusicControls from "./MusicControls";
import SearchPanel from "./SearchPanel";
import CenterPanel from "./CenterPanel";

import { useParams } from "react-router-dom";

import styles from "./style.module.css";

function Room({ musicRoom }) {

  const { roomId } = useParams();
  const { join, leave, isConnected } = musicRoom;

  const [isLoading, setIsLoading] = useState(true);
  const [membersMap, setMembersMap] = useState({});
  const [ song, setSong ] = useState({...DEFAULT_SONG});
  const [ djs, setDjs ] = useState([]);
  const [ currentDj, setCurrentDj ] = useState(null);
  
  const setters = {
    setDjs,
    setCurrentDj,
    setSong
  };

  const {
    bind,
    unbind
  } = useAttachRoomListeners(setters);

  /* eslint-disable */
  useEffect(() => {


    (async () => {
      setIsLoading(true);

      
      const { room ,song ,djs } = await join(roomId);

      const { members } = room;

      var map = {};
      for(var m of members){
        map[m._id] = m;
      }
      
      setDjs(djs);
      setMembersMap(map);

      setSong({
        ...DEFAULT_SONG,
        ...song
      });
      
      bind();

      setIsLoading(false);
    })();

    return () => {
      unbind();
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
              <MusicControls 
                song={song}
              />
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default Room;
