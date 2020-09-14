import React, { useReducer } from "react";

export const ACTIONS = {
    ADD_SONG : 0,
    REMOVE_SONG : 1,
    REMOVE_TOP : 2
}

function songQueueReducer(songQueue, action){

    const { payload } = action;

    switch(action.type){
        case ACTIONS.ADD_SONG : 
            return [...songQueue, payload];
        case ACTIONS.REMOVE_SONG :
            return songQueue.filter(s => s.songId !== payload.songId);
        case ACTIONS.REMOVE_TOP :
            var copy = [...songQueue];
            copy.shift();
            return copy;
        default: 
            return songQueue;
    }
}

function useSongQueueReducer(){

    const [ songQueue, songQueueDispatch ] = useReducer(songQueueReducer, []);

    return {
        songQueue,
        songQueueDispatch
    }
}

export default useSongQueueReducer;