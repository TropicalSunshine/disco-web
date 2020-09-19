import React, { useEffect, useState } from "react";

import { LoaderPage } from "shared/components/index";

import { DEFAULT_SONG } from "./DEFAULTS";
import attachRoomListeners from "./hooks/attachRoomListeners";

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
  const [ room, setRoom ] = useState({});
  const [ initialDjs, setInitialDjs ] = useState([]);
  const [ currentDj, setCurrentDj ] = useState(null);
  
  const setters = {
    setCurrentDj,
    setInitialDjs,
    setSong,
    setMembersMap
  };

  const {
    bind,
    unbind
  } = attachRoomListeners(setters);

  /* eslint-disable */
  useEffect(() => {


    (async () => {
      setIsLoading(true);

      
      const { room ,song ,djs, currentDj } = await join(roomId);

      const { members } = room;

      var map = {};
      for(var m of members){
        map[m._id] = m;
      }
      
      setInitialDjs(djs);
      setCurrentDj(currentDj);
      setMembersMap(map);

      setSong({
        ...DEFAULT_SONG,
        ...song
      });

      setRoom(room);
      
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
                  room={room}
                  initialDjs={initialDjs}
                  currentDj={currentDj}
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
