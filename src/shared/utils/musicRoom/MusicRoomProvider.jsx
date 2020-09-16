import React, { useState } from "react";

import MusicRoomContext from "./MusicRoomContext";
import useRoom from "./useRoom";





function MusicRoomProvider({children}){

    
    const [ isConnected, setIsConnected ] = useState(false);
    const [ isLoadingSong, setIsLoadingSong ] = useState(false);
    const [ hasError, setHasError ] = useState(false);

    const setters = {
        setIsLoadingSong,
        setIsConnected,
        setHasError
    }

    const roomMethods = useRoom(setters);

    var value = {
        
        isConnected,
        isLoadingSong,
        hasError,
        isProviderInitialized: true,

        ...roomMethods,
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