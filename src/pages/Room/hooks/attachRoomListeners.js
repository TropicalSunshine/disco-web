import { DEFAULT_SONG } from "../DEFAULTS";

import { User as UserApi } from "shared/utils/api";
import { Controls } from "shared/utils/socket";
import { youtube, YoutubePlayer } from "shared/utils/services";

function useAttachListeners(setters) {

    const {
        setSong,
        setCurrentDj,
        setMembersMap
    } = setters;

    const syncState = async (data) => {
        const { songId, time, currentDj } = data;
        await YoutubePlayer.loadVideo(songId, time);

        const {
            thumbnails,
            title,
            channelTitle,
            duration
        } = await youtube.getVideoInfoFormated(songId);

        setSong({
            ...DEFAULT_SONG,
            songId: songId,
            songImage: thumbnails,
            songTitle: title,
            songArtist: channelTitle,
            duration: duration,
            startTime: time
        });

        setCurrentDj(currentDj);
    }

    const bind = () => {
        Controls.addUpdateListener(data => {
            console.log(`[socket event] : update`);
            syncState(data);

        });

        Controls.addChangeSongListener(data => {
            console.log(`[socket event] : change song`);
            syncState(data);
        });


        //for user joining and leaving
        //make a mock data holder for a member
        //so when user leaves and joins consecutively it doesnt
        //cause a race condition between removing the user and
        //adding the user to members

        //execution
        // 1. add a mock data to member
        // 2.  

        Controls.addUserJoinRoomListener(({ userId }) => {
            setMembersMap( prevMembers => ({
                ...prevMembers,
                [userId] : {
                    username : "Loading..."
                }
            }));

            UserApi.getUserInfo(userId).then( response => {
                const info = response.data.data.getUserInfo;
                setMembersMap( prevMembers => {
                    if(prevMembers[userId] === undefined){
                        return prevMembers;
                    }

                    return {
                        ...prevMembers,
                        [userId] : info
                    }
                })
            });
        });

        Controls.addUserLeaveRoomListener(({userId}) => {
            setMembersMap( prevMembers => {
                var copy = {...prevMembers}
                delete copy[userId];
                return copy;
            })
        })
    }

    //add user join and user leave later on

    const unbind = () => {
        Controls.removeUpdateListener();
        Controls.removeChangeSongListener();
        Controls.removeUserLeaveRoomListener();
        Controls.removeUserLeaveRoomListener();
    }

    return {
        bind,
        unbind
    }


}

export default useAttachListeners;