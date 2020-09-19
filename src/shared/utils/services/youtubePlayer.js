var player = null;


export const init = async (videoId = null, startSeconds = 0) => {
    var constructConfigs = {
        width: 0,
        height: 0,
        loop: false
    };

    if (videoId !== null) {
        constructConfigs["videoId"] = videoId;
    }
    console.log("intializing player");
    await new Promise((res) => {
        constructConfigs.events = {
            "onReady": (e) => {
                console.log(videoId, startSeconds);
                const { target } = e;
                target.seekTo(startSeconds);

                target.setLoop(false);
                target.setShuffle(false);

                res();

                //e.target.playVideo();
            },
            onStateChange: (e) => {
                const { data, target } = e;
                switch (data) {
                    case window["YT"].PlayerState.ENDED : 
                        console.log("video ended");
                        target.stopVideo();
                        break;
                    default:
                        break;
                }
            }
        }

        player = new window["YT"].Player("player-root", constructConfigs);
        

    })
}

export const loadVideo = (vidId = null, startSeconds = 0) => {
    console.log("loading video");
    player.loadVideoById({
        videoId: vidId,
        startSeconds: startSeconds
    });

    return new Promise((res) => {
        player.addEventListener("onStateChange", (e) => {
            
            const { target, data } = e;
            
            switch(data) {
                case window["YT"].PlayerState.ENDED : 
                    console.log("video ended");
                    target.stopVideo();
                    break;
                case window["YT"].PlayerState.BUFFERING:
                    console.log(target.getDuration());
                    res();
                    break;
                default:
                    break;
            }


        })
    });
}

export const play = () => {
    player.playVideo();
}

export const pause = () => {
    player.pauseVideo();
}

export const stop = () => {
    player.stopVideo();
}

export const mute = () => {
    player.mute();
}

export const unMute = () => {
    player.unMute();
}

export const isInitialized = () => {
    return (player !== null);
}

//dont call this function unless display is turned on for #player
export const destroy = () => {
    player.destroy();
}

export const getVolume = () => {
    return player.getVolume();
}

export const setVolume = (val) => {
    player.setVolume(val);
}

export const getState = () => {

    const { video_id } = player.getVideoData();

    return {
        duration: player.getDuration(),
        songId: video_id,
        time: player.getCurrentTime()
    }
}