import { DEFAULT_SONG } from "./DEFAULTS";

import { User as UserApi } from "shared/utils/api";
import { Controls } from "shared/utils/socket";
import { youtube, YoutubePlayer } from "shared/utils/services";

function useAttachListeners(setters) {

    const {
        setSong,
        setCurrentDj,
        setMembersMap,
        setShowKickedDialog
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

    const getUserInfo = async (userId) => {
        console.log("getting user info");
        const response = await UserApi.getUserInfo(userId);

        const info = response.data.data.getUserInfo;
        setMembersMap(prevMembers => {

            var newMap = new Map(prevMembers);
            newMap.set(userId, info);
            return newMap;

        });
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
            console.log(`[socket event] user joined room`);
            setMembersMap(prevMembers => {
                var newMap = new Map(prevMembers);
                newMap.set(userId, {
                    username: "Loading..."
                });
                return newMap;
            });
            getUserInfo(userId);
        });

        Controls.addUserLeaveRoomListener(({ userId }) => {
            console.log(`[socket event] user leave room`);
            setMembersMap(prevMembers => {
                var newMap = new Map(prevMembers);
                newMap.delete(userId);
                return newMap;
            });
        });

        Controls.addUserDupListener(() => {
            console.log(`[socket event]: user dup`);
            setShowKickedDialog(true);
        })
    }

    //add user join and user leave later on

    const unbind = () => {
        Controls.removeUpdateListener();
        Controls.removeChangeSongListener();
        Controls.removeUserLeaveRoomListener();
        Controls.removeUserDupListener();
    }

    return {
        bind,
        unbind
    }


}

export default useAttachListeners;