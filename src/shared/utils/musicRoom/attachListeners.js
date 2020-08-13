import { Controls } from "shared/utils/socket";

function attachListeners(setters){

    const { 
        setPaused,
        setSongId,
        setSongStartTime
    } = setters;

    Controls.addPauseListener(data => {

        const { paused, songId, duration, time } = data;

        
        setPaused(paused);

    });

    Controls.addPlayListener(data => {

    });

    Controls.addUpdateListener(data => {
        
        const { songId, time, paused } = data;
        
        setSongId(songId);
        setSongStartTime(time);
        
        setPaused(paused);

        //load song in youtube video

    });

}