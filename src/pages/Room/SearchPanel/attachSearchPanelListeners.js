
import { DjControls } from "shared/utils/socket";
import { ACTIONS } from "./hooks/useSongQueueReducer";

function useAttachSearchPanelListeners(songQueueDispatch, addedSongIdMap) {
    const bind = () => {
        DjControls.addRequestListener(() => {
            console.log(`[socket event] : requesting song `);
            songQueueDispatch({
                type: ACTIONS.REMOVE_TOP_AND_RESPOND,
                callback: (song) => addedSongIdMap.current.delete(song.songId)
            });
        });
    };

    const unbind = () => {
        DjControls.removeRequestListener();
    };

    return {
        bind,
        unbind,
    };
}

export default useAttachSearchPanelListeners;
