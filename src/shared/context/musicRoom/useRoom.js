import { Socket } from "shared/utils/socket"
import { youtube, YoutubePlayer } from "shared/utils/services";
import { Room as RoomApi } from "shared/utils/api";

function useRoom(setters) {

    const {
        setIsConnected
    } = setters;


    /**
     * @throws { Error }
     */
    const join = async (roomId) => {

        const socketResponse = await Socket.connectSocket(roomId);

        const { songId, time, djs, currentDj } = socketResponse;
        console.log("socket response", socketResponse);
        console.log("[ROOM SONG DATA] : ", songId, time);


        var song = {
            songImage: null,
            songTitle: null,
            songArtist: null,
            duration: 0,
            startTime: time
        };

        if (songId !== null) {

            const { thumbnails,
                title,
                channelTitle,
                duration } = await youtube.getVideoInfoFormated(songId);


            song.songImage = thumbnails;
            song.songTitle = title;
            song.songArtist = channelTitle;
            song.duration = duration;
        }

        const roomData = await RoomApi.joinRoom(roomId);

        if (!YoutubePlayer.isInitialized()) await YoutubePlayer.init(songId, time); //init player if not initialized already
        else await YoutubePlayer.loadVideo(songId, time);

        setIsConnected(true);

        return {
            currentDj,
            djs,
            room: roomData.data.data.joinRoom,
            song
        }

    }

    const leave = async (roomId) => {
        try {
            Socket.disconnectSocket();
            setIsConnected(false);
            if (YoutubePlayer.isInitialized()) YoutubePlayer.stop();

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