import { DEFAULT_SONG } from "../DEFAULTS";
import { Controls } from "shared/utils/socket";
import { youtube, YoutubePlayer } from "shared/utils/services";

function useAttachListeners(setters){

    const { 
        setSong,
        setCurrentDj
    } = setters;

    const syncState =  async (data) => {
        const { songId, time, currentDj } = data;
        await YoutubePlayer.loadVideo(songId, time, false);

        const {
            thumnails,
            title,
            channelTitle,
            duration
        } = await youtube.getVideoInfoFormated(songId);

        setSong({
            songId : songId,
            songImage : thumnails,
            songTitle : title,
            songArtist : channelTitle,
            duration : duration,
            startTime : time 
        });

        setCurrentDj(currentDj);
    }

    const bind = () => {
        Controls.addUpdateListener( data => {
            console.log(`[socket event] : update`);
            syncState(data);
    
        });

        Controls.addChangeSongListener( data => {
            console.log(`[socket event] : change song`);
            syncState(data);
        })
    }

    //add user join and user leave later on

    const unbind = () => {
        Controls.removeUpdateListener();
        Controls.removeChangeSongListener();
    }

    return {
        bind,
        unbind
    }


}

export default useAttachListeners;