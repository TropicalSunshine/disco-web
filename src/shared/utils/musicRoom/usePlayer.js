import React, { useState } from "react";
import { Controls } from "shared/utils/socket";
import { youtube } from "shared/utils/services";

function usePlayer(setters, YoutubePlayer){    
    
    const { 
        setPaused,
        setSongId,
        setIsLoadingSong,
        setSongImage
    } = setters;


    const pause = () => {
        setPaused(true);
        Controls.emitPause();
        YoutubePlayer.pause();
    }

    const play = () => {
        setPaused(false);
        Controls.emitPlay();
        YoutubePlayer.play();
    }

    const queue = (songId) => {

    }

    const changeSong = async (songId) => {
        setIsLoadingSong(true);
        setSongId(songId);

        await YoutubePlayer.loadVideo(songId, 0, false);
        const data = await youtube.getVideoInfoData(songId);
        setSongImage(data.snippet.thumbnails.high.url);
        
        Controls.emitChangeSong(YoutubePlayer.getState());
        setIsLoadingSong(false);
    }



    return {
        pause,
        play,
        queue,
        changeSong
    }

}

export default usePlayer;