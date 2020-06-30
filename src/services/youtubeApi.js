import Axios from "axios";

const YOUTUBE_API_KEY            ="AIzaSyC3uwL4wESiIqK51d4xwQfd5APWxC2H2lo";
const YOUTUBE_API_BASE_URL       =  "https://www.googleapis.com/youtube/v3"; 


export const YOUTUBE_SEARCH = `${YOUTUBE_API_BASE_URL}/search`


export const searchVideoByKeyword = (q) => {
    return Axios.get(YOUTUBE_SEARCH, {
        params: {
            key: YOUTUBE_API_KEY,
            maxResults: 15,
            part: "snippet",
            type: "video",
            q: q
        }
    });
}
