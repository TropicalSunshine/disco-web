import React, { useReducer } from "react";

export const ACTIONS = {
    ADD_SONG : 0,
    REMOVE_SONG : 1
}

function songQueueReducer(songQueue, action){

    const { payload } = action;

    switch(action.type){
        case ACTIONS.ADD_SONG : 
            
            songQueue.push(payload);
            return songQueue;

        case ACTIONS.REMOVE_SONG :

            return songQueue.filter(s => s.songId !== payload.songId);
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