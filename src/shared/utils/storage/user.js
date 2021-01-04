import localStorage from "./localStorage";

const tokenKey = "token";
const userIdKey = "userId";
const rtKey = "rt"; //refresh token
const lastRtKey = "lastRtKey";

export const token = {
    get : () => localStorage.getItem(tokenKey),
    set : token => localStorage.setItem(tokenKey, token),
    clear : () => localStorage.removeItem(tokenKey)
}

export const userId = {
    get : () => localStorage.getItem(userIdKey),
    set : userId => localStorage.setItem(userIdKey, userId),
    clear : () => localStorage.removeItem(userIdKey)
}

export const rt = {
    get : () => localStorage.getItem(rtKey),
    set : rt => localStorage.setItem(rtKey, rt),
    clear : () => localStorage.removeItem(rtKey)
}

//time of last refresh
export const lastRt = {
    get : () => localStorage.getItem(lastRtKey),
    set : last_rt => localStorage.setItem(lastRtKey, last_rt),
    clear : () => localStorage.removeItem(lastRtKey)
}