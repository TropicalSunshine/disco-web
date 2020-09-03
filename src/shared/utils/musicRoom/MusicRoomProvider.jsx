import React, { useState } from "react";

import MusicRoomContext from "./MusicRoomContext";
import usePlayer from "./usePlayer";
import useRoom from "./useRoom";





function MusicRoomProvider({children}){

    
    const [ isConnected, setIsConnected ] = useState(false);

    const [ isLoadingSong, setIsLoadingSong ] = useState(false);
    const [ paused , setPaused ] = useState(true);
    const [ songId, setSongId ] = useState("");
    const [ songImage, setSongImage ] = useState("");
    const [ songArtist, setSongArtist ] = useState("");
    const [ songTitle, setSongTitle ] = useState("");

    const [ songStartTime, setSongStartTime ] = useState(0);
    const [ hasError, setHasError ] = useState(false);

    const setters = {
        setIsLoadingSong,
        setIsConnected,
        setPaused,
        setSongId,
        setSongImage,
        setSongArtist,
        setSongTitle,
        setSongStartTime,
        setHasError
    }

    const roomMethods = useRoom(setters);
    const playerMethods = usePlayer(setters, paused);

    var value = {
        songId,
        isConnected,
        isLoadingSong,
        paused,
        songImage,
        songStartTime,
        songTitle,
        songArtist,
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