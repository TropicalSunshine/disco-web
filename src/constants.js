
const YOUTUBE_API_KEY="AIzaSyC3uwL4wESiIqK51d4xwQfd5APWxC2H2lo";
const YOUTUBE_API_URL="https://www.googleapis.com/youtube/v3"; 


const constants = Object.freeze({
    USERJOINROOM: 1,
    USERCREATEROOM: 2,
    USERCHANGESONG: 3,
    USERINPUT: 4,
    controls: {
        PLAY: 5,
        PAUSE: 6,
        SEEK:  7
    }  
});

module.exports = constants;