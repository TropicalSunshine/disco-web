import React, { useState, useEffect } from "react";

import usePlayer from "";
import useRoom from "";
import MusicRoomContext from "./MusicRoomContext";


function MusicRoomProvider({children}){

    const [ isConnected, setIsConnected ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ play, setPlay ] = useState(false);
    const [ pause, setPause ] = useState(true);
    const [ songImage, setSongImage ] = useState(null);
    const [ songId, setSongId ] = useState("");
    const [ hasError, setHasError ] = useState(false);

    const setters = {
        setIsConnected,
        setPlay,
        setPause,
        setSongImage,
        setIsLoading,
        setHasError
    }

    useEffect(() => {

    }, [isConnected])

    

    const roomMethods = useRoom(setters);
    const playerMethods = usePlayer(setters);

    var value = {
        isConnected,
        isLoading,
        play,
        pause,
        songImage,
        hasError


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