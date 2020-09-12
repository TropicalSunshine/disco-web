import Axios from "axios";
import { duration, ISO_8601 } from "moment";

const YOUTUBE_API_KEY            =  process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL       =  "https://www.googleapis.com/youtube/v3"; 

const YOUTUBE_SEARCH = `${YOUTUBE_API_BASE_URL}/search`
const YOUTUBE_VIDEO = `${YOUTUBE_API_BASE_URL}/videos`

const MUSIC_CATEGORY_ID = 10;
const MAX_RESULTS = 15;

export const searchVideoByKeyword = async (q) => {

    const response = await Axios.get(YOUTUBE_SEARCH, {
        params: {
            key: YOUTUBE_API_KEY,
            maxResults: MAX_RESULTS,
            part: "id, snippet",
            type: "video",
            q: q
        }
    }).catch(err => {
        console.error(err);
    });

    return response.data.items;

}

export const getVideoInfo = (vidId) => {
    
    return Axios.get(YOUTUBE_VIDEO, {
        params : {
            key : YOUTUBE_API_KEY,
            id : vidId,
            part : "id,snippet,contentDetails"
        }
    })
}

export const getVideoInfoFormated = async (vidId) => {

    const response = await getVideoInfo(vidId);
    var val = response.data.items[0]; 
    console.log(val);

    return {
        thumbnails : val.snippet.thumbnails,
        title : val.snippet.title,
        channelTitle : val.snippet.channelTitle,
        duration : duration(val.contentDetails.duration, ISO_8601).asSeconds()
    };
}

export const getMostPopularVideos = async () => {
    const response = await Axios.get( YOUTUBE_VIDEO, {
        params : {
            part : "id, snippet",
            key : YOUTUBE_API_KEY,
            chart : "mostPopular",
            regionCode : "US",
            videoCategoryId : MUSIC_CATEGORY_ID,
            maxResults: MAX_RESULTS
        }
    }).catch(err => console.error(err));

    return response.data.items;
}