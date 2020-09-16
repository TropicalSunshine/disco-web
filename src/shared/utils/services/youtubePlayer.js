var player = null;


export const init = async (videoId = null, startSeconds = 0, paused = true) => {
    var constructConfigs = {
        width: 0,
        height: 0,
        loop: false
    };

    if (videoId !== null) {
        constructConfigs["videoId"] = videoId;
    }

    await new Promise((res) => {
        constructConfigs.events = {
            "onReady": (e) => {
                console.log(videoId, startSeconds, paused);
                const { target } = e;
                target.seekTo(startSeconds);

                target.setLoop(false);
                target.setShuffle(false);

                if (paused) {
                    console.log("paused loaded")
                    e.target.pauseVideo();
                } else {
                    console.log("play loaded")
                    e.target.playVideo();
                }
                res();

                //e.target.playVideo();
            },
            onStateChange: (e) => {
                const { data, target } = e;
                switch (data) {
                    case window["YT"].PlayerState.PAUSED:
                        //console.log("pausing")
                        break;
                    case window["YT"].PlayerState.PLAYING:
                        //console.log("play")
                        break;
                    case window["YT"].PlayerState.ENDED : 
                        target.stopVideo();
                    default:
                        break;
                }
            }
        }

        player = new window["YT"].Player("player", constructConfigs);
        

    })
}

export const loadVideo = (vidId, startSeconds = 0, paused = false) => {
    player.loadVideoById({
        videoId: vidId,
        startSeconds: startSeconds
    });

    return new Promise((res) => {
        player.addEventListener("onStateChange", (e) => {
            console.log("state changed");

            const { target, data } = e;

            switch(data) {
                case window["YT"].PlayerState.ENDED : 
                    target.stopVideo();
                    break;
                case window["YT"].PlayerState.BUFFERING:
                    console.log(target.getDuration());
                    break;
            }


            if (paused) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }

            player.removeEventListener("onStateChange");
            res();
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

export const getState = () => {

    const { video_id } = player.getVideoData();

    return {
        duration: player.getDuration(),
        songId: video_id,
        time: player.getCurrentTime()
    }
}