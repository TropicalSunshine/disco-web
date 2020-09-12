
import useAttachListeners from "./useAttachListeners";
import { Socket } from "shared/utils/socket"
import { youtube, YoutubePlayer } from "shared/utils/services";
import { Room as RoomApi } from "shared/utils/api";

function useRoom(setters){

    const {
        setIsConnected
    } = setters;

    const { 
        bind,
        unbind
    }  = useAttachListeners(setters);

    const join = async (roomId) => {

        try {
            if(!YoutubePlayer.isInitialized()) await YoutubePlayer.init(); //init player if not initialized already
            const socketResponse = await Socket.connectSocket(roomId);
            console.log(socketResponse);
            const { songId, time, djs } = socketResponse;

            console.log("[ROOM SONG DATA] : ", songId, time );
    
            await YoutubePlayer.loadVideo(songId, time, false);

            var song = {
                songImage : null,
                songTitle : null,
                songArtist : null
            };

            if(songId !== null){
                
                const response = await youtube.getVideoInfoData(songId);
                console.log(response);
                var { snippet } = response;
                
                song.songImage = snippet.thumbnails;
                song.songTitle = snippet.title;
                song.songArtist = snippet.channelTitle; 
    
            }
            
            const roomData = await RoomApi.joinRoom(roomId);
    
            bind();
            setIsConnected(true);
    
            return {
                djs,
                room : roomData.data.data.joinRoom,
                song
            }
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
        }

    }


    return {
        join,
        leave
    }


}

export default useRoom;