
import { DjControls } from "shared/utils/socket";
import { ACTIONS } from "./useSongQueueReducer";

function useAttachSearchPanelListeners(songQueueDispatch) {
    const bind = () => {
        DjControls.addRequestListener(() => {
            console.log("requesting song");
            songQueueDispatch({
                type: ACTIONS.REMOVE_TOP_AND_RESPOND,
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
