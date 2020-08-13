import React, { useState, useEffect } from "react";

import { YoutubePlayer } from "shared/utils/services";


import MusicRoomContext from "./MusicRoomContext";
import usePlayer from "./usePlayer";
import useRoom from "./useRoom";
import attachListeners from "./attachListeners";



function MusicRoomProvider({children}){

    const [ isConnected, setIsConnected ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ paused , setPaused ] = useState(true);
    const [ songId, setSongId ] = useState(null);
    const [ songImage, setSongImage ] = useState(null);
    const [ songStartTime, setSongStartTime ] = useState(0);
    const [ hasError, setHasError ] = useState(false);

    const [ isPlayerInitialized, setIsPlayerInitialized ] = useState(false);
    
    const youtubePlayer = new YoutubePlayer();

    const setters = {
        setIsConnected,
        setPaused,
        setSongId,
        setSongImage,
        setSongStartTime,
        setIsLoading,
        setHasError,
        setSongStartTime,
        setIsPlayerInitialized
    }

    //called only once
    useEffect(() => {

        (async () => {
            setIsLoading(true);

            //attach socket listeners
            attachListeners(setters);


            setIsLoading(false);
        })();
        


    }, [])

    

    const roomMethods = useRoom(setters );
    const playerMethods = usePlayer(setters);

    var value = {
        isConnected,
        isLoading,
        paused,
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

export default MusicRoomProvider;