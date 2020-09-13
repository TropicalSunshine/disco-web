
import { DjControls } from "shared/utils/socket";
import { ACTIONS } from "./useSongQueueReducer";

function useAttachSearchPanelListeners(songQueue, songQueueDispatch){

    const bind = () => {
        DjControls.addRequestListener(() => {
            var song = null;
            if(songQueue.length > 0){
                song = songQueue[0];
                songQueueDispatch({
                    type : ACTIONS.REMOVE_TOP
                });
            }

            DjControls.emitResponse(song);
        })
    }

    const unbind = () => {
        DjControls.removeRequestListener();
    }

    return {
        bind,
        unbind
    }
};

export default useAttachSearchPanelListeners;


