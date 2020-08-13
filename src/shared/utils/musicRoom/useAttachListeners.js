import { Controls } from "shared/utils/socket";
import { youtube } from "shared/utils/services";

function useAttachListeners(setters, YoutubePlayer){

    const { 
        setPaused,
        setSongId,
        setSongStartTime,
        setIsLoadingSong,
        setSongImage
    } = setters;

    const bind = () => {
        Controls.addPauseListener(data => {
    
            const { paused } = data;
            
            
            if( paused ) {
                setPaused(paused);
                YoutubePlayer.pause();
            }

        });
    
        Controls.addPlayListener(data => {
            const { paused } = data;
            
            if(!paused) {
                setPaused(paused);
                YoutubePlayer.play();
            }
        });
    
        Controls.addUpdateListener(data => {
            
            (async () => {
                const { songId, time, paused } = data;
                setIsLoadingSong(true);

                await YoutubePlayer.loadVideo(songId, time, paused);
                setSongId(songId);
                setSongStartTime(time);
                setPaused(paused);
    
                const data = await youtube.getVideoInfoData(songId);
                setSongImage(data.snippet.thumbnails.high.url);
    
                setIsLoadingSong(false);

            })();

    
        });
    }

    const unbind = () => {

    }

    return {
        bind,
        unbind
    }


}

export default useAttachListeners;