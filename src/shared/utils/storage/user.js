import localStorage from "./localStorage";

const tokenKey = "token";
const userIdKey = "userId";
const rtKey = "rt"; //refresh token

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

//time of last refresh
export const rt = {
    get : () => localStorage.getItem(rtKey),
    set : rt => localStorage.setItem(rtKey, rt),
    clear : () => localStorage.removeItem(rtKey)
}