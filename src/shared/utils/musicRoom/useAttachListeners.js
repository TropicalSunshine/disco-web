import { Controls } from "shared/utils/socket";
import { youtube, YoutubePlayer } from "shared/utils/services";

function useAttachListeners(setters){

    const { 
        setPaused,
        setSongId,
        setSongStartTime,
        setIsLoadingSong,
        setSongImage,
        setSongTitle,
        setSongArtist
    } = setters;



    const bind = () => {
        Controls.addPauseListener(data => {
            
            console.log(`[socket event] : pause`);
            const { paused } = data;
            
            
            if( paused ) {
                setPaused(paused);
                YoutubePlayer.pause();
            }

        });
    
        Controls.addPlayListener(data => {

            console.log(`[socket event] : play`);
            const { paused } = data;
            
            if(!paused) {
                setPaused(paused);
                YoutubePlayer.play();
            }
        });

    
        Controls.addUpdateListener( data => {
            console.log(`[socket event] : update`);
            (async (data) => {
                const { songId, time, paused } = data;
                setIsLoadingSong(true);

                await YoutubePlayer.loadVideo(songId, time, paused);
                setSongId(songId);
                setSongStartTime(time);
                setPaused(paused);
    
                const response = await youtube.getVideoInfoData(songId);
                const { snippet } = response;
                setSongImage(snippet.thumbnails);
                setSongTitle(snippet.title);
                setSongArtist(snippet.channelTitle);
                setIsLoadingSong(false);

            })(data);

    
        });

        Controls.addChangeSongListener( data => {

            console.log(`[socket event] : change song`);

            (async (data) => {
                const { songId } = data;
                setIsLoadingSong(true);

                await YoutubePlayer.loadVideo(songId, 0, false);
                setSongId(songId);
                setSongStartTime(0);
                setPaused(false); 

                const response = await youtube.getVideoInfoData(songId);
                const { snippet } = response;
                setSongImage(snippet.thumbnails);
                setSongTitle(snippet.title);
                setSongArtist(snippet.channelTitle);

                setIsLoadingSong(false);
            })(data);

        })
    }

    const unbind = () => {
        Controls.removePauseListener();
        Controls.removePlayListener();
        Controls.removeUpdateListener();
        Controls.removeChangeSongListener();
    }

    return {
        bind,
        unbind
    }


}

export default useAttachListeners;