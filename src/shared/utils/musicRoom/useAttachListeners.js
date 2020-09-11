import { Controls } from "shared/utils/socket";
import { youtube, YoutubePlayer } from "shared/utils/services";

function useAttachListeners(setters){

    const { 
        setSongId,
        setSongStartTime,
        setIsLoadingSong,
        setSongImage,
        setSongTitle,
        setSongArtist
    } = setters;



    const bind = () => {

    
        Controls.addUpdateListener( data => {
            console.log(`[socket event] : update`);
            (async (data) => {
                const { songId, time } = data;
                setIsLoadingSong(true);

                await YoutubePlayer.loadVideo(songId, time, false);
                setSongId(songId);
                setSongStartTime(time);
                
    
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
        Controls.removeUpdateListener();
        Controls.removeChangeSongListener();
    }

    return {
        bind,
        unbind
    }


}

export default useAttachListeners;