
function YoutubePlayer(videoId=null,startSeconds=0, paused=true){
    this.player = null;
    this.videoId = videoId;
    this.duration = 0;
    this.paused = paused;
    this.time = startSeconds;
}

YoutubePlayer.prototype.init = function(){

    var constructConfigs = {
        width: 0,
        height: 0,
        loop: false
    };

    if(this.videoId !== null){
        constructConfigs["videoId"] = this.videoId;
    }

    var that = this;
    return new Promise((res) => {
        constructConfigs.events = {
            onReady: (e) => {
                
                this.duration = e.target.getDuration();
                e.target.seekTo(that.time);

                console.log(this.paused);
                if(this.paused) {
                    console.log("paused loaded")
                    e.target.pauseVideo();
                } else {
                    console.log("paused loaded")
                    e.target.playVideo();
                }

                res();

                //e.target.playVideo();
            },
            onStateChange: (e) => {
                switch(e.data){
                    case window["YT"].PlayerState.PAUSED:
                        console.log("pausing")
                        that.paused = true;
                        break;
                    case window["YT"].PlayerState.PLAYING:
                        console.log("play")
                        that.paused = false;
                        break;
                }
            }
        }

        console.log(constructConfigs);

        this.player = new window["YT"].Player("player", constructConfigs );
    })

}

YoutubePlayer.prototype.loadVideo = function(vidId, startSeconds=0){
    this.player.loadVideoById({
        videoId: vidId,
        startSeconds: startSeconds
    });

    this.videoId = vidId;

    this.player.playVideo();
    
    return new Promise((res) => {
        this.player.addEventListener("onStateChange", (e) => {

            if(e.data === window["YT"].PlayerState.BUFFERING){
                console.log("buffering");
                console.log(e.target.getDuration());
                this.duration = e.target.getDuration();
                res();
            }
        })
    });
}

YoutubePlayer.prototype.play = function(){
    this.player.playVideo();
}

YoutubePlayer.prototype.pause = function(){
    this.player.pauseVideo();
}

YoutubePlayer.prototype.getState = function(){

    
    return {
        duration:  this.duration,
        songId: this.videoId,
        paused: this.paused,
        time: this.player.getCurrentTime()
    }
}

YoutubePlayer.prototype.destroy = function(){
    this.player.destroy();
}

export default YoutubePlayer;