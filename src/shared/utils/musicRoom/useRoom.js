import React from "react";
import useAttachListeners from "./useAttachListeners";
import { Socket } from "shared/utils/socket"
import { youtube, YoutubePlayer } from "shared/utils/services";


function useRoom(setters){
    const { 
        setIsConnected,
        setHasError,
        setPaused,
        setSongId,
        setSongImage
    } = setters;

    const { 
        bind,
        unbind
    }  = useAttachListeners(setters);

    const join = async (roomId) => {


        try {
            const { songId, time, paused } = await Socket.connectSocket(roomId);
            
            console.log("[ROOM SONG DATA] : ", songId, time, paused);

            if(!YoutubePlayer.isInitialized()) {
                await YoutubePlayer.init(songId, time, paused);
            } else {
                await YoutubePlayer.loadVideo(songId, time, paused);
            }
            
            if(songId !== null){
                
                const data = await youtube.getVideoInfoData(songId);
                setSongImage(data.snippet.thumbnails.high.url);    
            }

            bind();
            setPaused((songId !== null) ? paused : true);
            setSongId(null);
            setIsConnected(true);
            setSongId(songId);

        } catch (err) {
            console.error(err);
            setHasError(true);
        }

    }

    const leave = () => {
    
        try {
            Socket.disconnectSocket();
            setPaused(true);
            setIsConnected(false);
            YoutubePlayer.stop();
            unbind();
        } catch (err) {
            console.error(err);
            setHasError(true);
        }

    }


    return {
        join,
        leave
    }


}

export default useRoom;