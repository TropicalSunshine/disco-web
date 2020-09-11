import { Controls } from "shared/utils/socket";
import { youtube, YoutubePlayer } from "shared/utils/services";

function usePlayer(setters, paused){    
    
    const { 
        setPaused,
        setSongId,
        setIsLoadingSong,
        setSongImage
    } = setters;

    const changeSong = async (songId) => {
        setIsLoadingSong(true);
        setSongId(songId);

        setPaused(false);
        await YoutubePlayer.loadVideo(songId, 0, false);
        const data = await youtube.getVideoInfoData(songId);
        setSongImage(data.snippet.thumbnails.high.url);
        
        Controls.emitChangeSong({
            ...(YoutubePlayer.getState())
        });

        setIsLoadingSong(false);
    };



    return {
        queue,
        changeSong
    }

}

export default usePlayer;