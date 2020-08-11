import React, { useState } from "react";

function usePlayer(setters){    
    
    const { 
        setPlay,
        setPause
    } = setters;


    const pause = () => {

    }

    const play = () => {

    }

    const queue = () => {

    }

    const changeSong = () => {
         
    }

    return {
        pause,
        play,
        queue
    }

}

export default usePlayer;