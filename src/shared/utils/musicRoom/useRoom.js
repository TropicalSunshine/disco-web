import React from "react";
import useAttachListeners from "./useAttachListeners";
import { Socket } from "shared/utils/socket"
import { youtube } from "shared/utils/services";


function useRoom(setters, YoutubePlayer){
    const { 
        setIsConnected,
        setIsLoading,
        setHasError,
        setPaused,
        setSongId,
        setSongImage
    } = setters;

    const { 
        bind,
        unbind
    }  = useAttachListeners(setters, YoutubePlayer);

    const join = async (roomId) => {

        setIsLoading(true);

        try {
            const { songId, time, paused } = await Socket.connectSocket(roomId);
            console.log("songId", songId);
            if(songId !== null){

                const data = await youtube.getVideoInfoData(songId);

                setSongImage(data.snippet.thumbnails.high.url);

                if(YoutubePlayer.isInitialized){
                    await YoutubePlayer.init(songId, time, paused);
                    console.log("initialized");
                    console.log(YoutubePlayer);
                } else {
                    await YoutubePlayer.loadVideo(songId, time, paused);
                }
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

        setIsLoading(false);

    }

    const leave = () => {
    
        try {
            Socket.disconnectSocket();
            setPaused(true);
            setIsConnected(false);
            YoutubePlayer.stopVideo();
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