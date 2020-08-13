import React from "react";
import { Socket } from "shared/socket"



function useRoom(setters, player, isPlayerInitialized){
    const { 
        setIsConnected,
        setIsLoading,
        setHasError,
        setPaused,
        setSongId,
        setIsPlayerInitialized
    } = setters;

    const join = async (roomId) => {
        setIsLoading(true);

        try {
            const { songId, time, paused } = await Socket.connectSocket(roomId);

            setPaused(paused);
            setSongId(null);
            setIsConnected(true);
            
            setSongId(songId);

        } catch (err) {
            console.error(err);
            setHasError(true);
        }

        setIsLoading(false);

    }

    const leave = () => {
        
        setIsLoading(true);

        try {
            await Socket.disconnectSocket();
            setIsConnected(false);
        } catch (err) {
            console.error(err);

        }

        setIsLoading(false);

    }


    return {
        join,
        leave
    }


}

export default useRoom;