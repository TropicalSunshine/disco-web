
function YoutubePlayer(){
    this.player = null;
}

YoutubePlayer.prototype.init = function(){

    return new Promise((rej) => {
        this.player = new window["YT"].Player("player", {
            videoId: "NkMTKGM-efw",
            width: 0,
            height: 0,
            loop: false,
            events: {
                onReady: (e) => {
                    rej();
                    //e.target.playVideo();
                }
            }
        });
    })

}

YoutubePlayer.prototype.loadVideo = async function(vidId, startSeconds=0){
    this.player.loadVideoById({
        videoId: vidId,
        startSeconds: startSeconds
    });

    return new Promise((rej) => {
        this.player.onReady = () => {
            rej();
        }
    });
}

YoutubePlayer.prototype.play = function(){
    this.player.playVideo();
}

YoutubePlayer.prototype.pause = function(){
    this.player.pauseVideo();
}


export default YoutubePlayer;