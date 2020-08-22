import React, { useState, useEffect } from "react";

import { YoutubePlayer } from "shared/utils/services";

import MusicRoomContext from "./MusicRoomContext";
import usePlayer from "./usePlayer";
import useRoom from "./useRoom";





function MusicRoomProvider({children}){

    
    const [ isConnected, setIsConnected ] = useState(false);

    const [ isLoadingSong, setIsLoadingSong ] = useState(false);
    const [ paused , setPaused ] = useState(true);
    const [ songId, setSongId ] = useState(null);
    const [ songImage, setSongImage ] = useState(null);
    const [ songStartTime, setSongStartTime ] = useState(0);
    const [ hasError, setHasError ] = useState(false);

    const setters = {
        setIsLoadingSong,
        setIsConnected,
        setPaused,
        setSongId,
        setSongImage,
        setSongStartTime,
        setHasError,
        setSongStartTime
    }

    const roomMethods = useRoom(setters);
    const playerMethods = usePlayer(setters, paused);

    var value = {
        isConnected,
        isLoadingSong,
        paused,
        songImage,
        songStartTime,
        hasError,
        isProviderInitialized: true,


        ...roomMethods,
        ...playerMethods
    };
    
    return (
        <MusicRoomContext.Provider value={value}>
            { 
                children
            }
        </MusicRoomContext.Provider>
    )
}

export default MusicRoomProvider;