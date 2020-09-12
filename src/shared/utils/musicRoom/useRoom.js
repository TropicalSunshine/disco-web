
import useAttachListeners from "./useAttachListeners";
import { Socket } from "shared/utils/socket"
import { youtube, YoutubePlayer } from "shared/utils/services";
import { Room as RoomApi } from "shared/utils/api";

function useRoom(setters){
    const { 
        setIsConnected,
        setHasError,
        setSongId,
        setSongImage,
        setSongTitle,
        setSongArtist
    } = setters;

    const { 
        bind,
        unbind
    }  = useAttachListeners(setters);

    const join = async (roomId) => {

        try {
            if(!YoutubePlayer.isInitialized()) await YoutubePlayer.init(); //init player if not initialized already
            const { songId, time, paused } = await Socket.connectSocket(roomId);
    
            console.log("[ROOM SONG DATA] : ", songId, time, paused);
    
            await YoutubePlayer.loadVideo(songId, time, false);
            
            if(songId !== null){
                
                const response = await youtube.getVideoInfoData(songId);
                const { snippet } = response;
                setSongImage(snippet.thumbnails);
                setSongTitle(snippet.title);
                setSongArtist(snippet.channelTitle); 
            }
            
            const roomData = await RoomApi.joinRoom(roomId);
    
            bind();
            setIsConnected(true);
            setSongId(songId);
    
            return roomData.data.data.joinRoom;
        } catch (err) {
            console.error(err);
        }

    }

    const leave = async (roomId) => {
        try {
            Socket.disconnectSocket();
            setIsConnected(false);
            YoutubePlayer.stop();
            unbind();
            
            await RoomApi.leaveRoom(roomId);
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