import React, { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { LoaderPage } from "shared/components/index";
import { Message as MessageDialog } from "shared/components/dialog";

import { DEFAULT_SONG } from "./DEFAULTS";
import attachRoomListeners from "./attachRoomListeners";

import MessagePanel from "./MessagePanel";
import MusicControls from "./MusicControls";
import SearchPanel from "./SearchPanel";
import CenterPanel from "./CenterPanel";

import styles from "./style.module.css";

function Room({ musicRoom }) {

  const history = useHistory();
  const { roomId } = useParams();
  const { join, leave } = musicRoom;

  const [isLoading, setIsLoading] = useState(true);
  const [membersMap, setMembersMap] = useState(new Map());
  const [song, setSong] = useState({ ...DEFAULT_SONG });
  const [room, setRoom] = useState({});
  const [initialDjs, setInitialDjs] = useState([]);
  const [currentDj, setCurrentDj] = useState(null);

  const [ showKickedDialog, setShowKickedDialog ] = useState(false);

  const setters = {
    setCurrentDj,
    setInitialDjs,
    setSong,
    setMembersMap,
    setShowKickedDialog
  };

  const {
    bind,
    unbind
  } = attachRoomListeners(setters);

  const connect = async () => {
    setIsLoading(true);

    try {
      const { room, song, djs, currentDj } = await join(roomId);

      const { members } = room;

      var map = new Map();
      for (var m of members) {
        map.set(m._id, m);
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

    } catch (err) {
      toast.warning(err.message);
    }
  }

  /* eslint-disable */
  useLayoutEffect(() => {

    connect();

    return () => {
      unbind();
      leave(roomId); //change this later useEffect is not async 
      //ref: https://dev.to/n1ru4l/homebrew-react-hooks-useasynceffect-or-how-to-handle-async-operations-with-useeffect-1fa8#:~:text=An%20async%20function%20always%20returns,changes%20or%20the%20component%20unmounts.
    };

  }, []);
  /* eslint-enable */

  const handleMessageDialogClose = () => {
    setShowKickedDialog(false);
    unbind();
    leave();
    history.push("/explore");
  }

  return (
    <React.Fragment>
      {showKickedDialog && (<MessageDialog
        show={true}
        handleClose={handleMessageDialogClose}
        message={"Sign in from another device detected"}
      />)}
      {isLoading && <LoaderPage />}
      {!isLoading && (
        <>
          <Helmet>
            <title>Disco - {room.name}</title>
          </Helmet>
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
