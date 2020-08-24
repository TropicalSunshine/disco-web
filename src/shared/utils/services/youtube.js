import Axios from "axios";

const YOUTUBE_API_KEY            =  "AIzaSyAwqryCo-XPWewUlnT19wJ3AfPQuyFaVDE";
const YOUTUBE_API_BASE_URL       =  "https://www.googleapis.com/youtube/v3"; 

const YOUTUBE_SEARCH = `${YOUTUBE_API_BASE_URL}/search`
const YOUTUBE_VIDEO = `${YOUTUBE_API_BASE_URL}/videos`


export const searchVideoByKeyword = async (q) => {

    return Axios.get(YOUTUBE_SEARCH, {
        params: {
            key: YOUTUBE_API_KEY,
            maxResults: 15,
            part: "snippet",
            type: "video",
            q: q
        }
    }).catch(err => {
        console.error(err);
    })

}

export const getVideoInfo = (vidId) => {
    
    return Axios.get(YOUTUBE_VIDEO, {
        params : {
            key : YOUTUBE_API_KEY,
            id : vidId,
            part : "id,snippet"
        }
    })
}

export const getVideoInfoData = async (vidId) => {
    const response = await getVideoInfo(vidId);
    return response.data.items[0];
}