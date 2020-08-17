var player = null;


export const init = async (videoId=null, startSeconds=0, paused=true) => {
    var constructConfigs = {
        width: 0,
        height: 0,
        loop: false
    };

    if(videoId !== null){
        constructConfigs["videoId"] = videoId;
    }

    await new Promise((res) => {
        constructConfigs.events = {
            onReady: (e) => {
                const { target } = e;
                target.seekTo(startSeconds);

                
                if(paused) {
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
                switch(e.data){
                    case window["YT"].PlayerState.PAUSED:
                        console.log("pausing")
                        
                        break;
                    case window["YT"].PlayerState.PLAYING:
                        console.log("play")
                        
                        break;
                    default: 
                        break;
                }
            }
        }


        player = new window["YT"].Player("player", constructConfigs );
        
    })
}

export const loadVideo = (vidId, startSeconds=0, paused=false) => { 
    player.loadVideoById({
        videoId: vidId,
        startSeconds: startSeconds
    });

    if(paused){
        player.pauseVideo();
    } else {
        player.playVideo();
    }

    return new Promise((res) => {
        player.addEventListener("onStateChange", (e) => {

            if(e.data === window["YT"].PlayerState.BUFFERING){
                
                console.log(e.target.getDuration());
                
                res();
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

export const isInitialized = () => {
    return (player !== null);
}

export const destroy = () => {
    player.destroy();
}

export const getState = () => {

    const { video_id } = player.getVideoData();

    return {
        duration : player.getDuration(),
        songId : video_id,
        time : player.getCurrentTime()
    }
}