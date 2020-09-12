import { Controls } from "shared/utils/socket";
import { youtube, YoutubePlayer } from "shared/utils/services";

function usePlayer(setters){    
    
    const { 
        setSongId,
        setIsLoadingSong,
        setSongImage
    } = setters;

    const changeSong = async (songId) => {
        setIsLoadingSong(true);
        setSongId(songId);

        await YoutubePlayer.loadVideo(songId, 0, false);
        const data = await youtube.getVideoInfoData(songId);
        setSongImage(data.snippet.thumbnails.high.url);
        
        Controls.emitChangeSong({
            ...(YoutubePlayer.getState())
        });

        setIsLoadingSong(false);
    };



    return {
        changeSong
    }

}

export default usePlayer;