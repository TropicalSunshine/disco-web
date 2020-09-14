import React, { useReducer } from "react";
import { DjControls } from "shared/utils/socket";

export const ACTIONS = {
    ADD_SONG: 0,
    REMOVE_SONG: 1,
    REMOVE_TOP: 2,
    REMOVE_TOP_AND_RESPOND: 3
}

function songQueueReducer(songQueue, action) {

    const { payload } = action;

    switch (action.type) {
        case ACTIONS.ADD_SONG:
            return [...songQueue, payload];
        case ACTIONS.REMOVE_SONG:
            return songQueue.filter(s => s.songId !== payload.songId);
        case ACTIONS.REMOVE_TOP:
            var copy = [...songQueue];
            copy.shift();
            return copy;
        case ACTIONS.REMOVE_TOP_AND_RESPOND:
            var song = (songQueue.length > 0) ? songQueue[0] : null;
            console.log("sending song", song);
            DjControls.emitResponse(song);
            var copy = [...songQueue];
            copy.shift();
            return copy;
        default:
            return songQueue;
    }
}

function useSongQueueReducer() {

    const [songQueue, songQueueDispatch] = useReducer(songQueueReducer, []);

    return {
        songQueue,
        songQueueDispatch
    }
}

export default useSongQueueReducer;