import localStorage from "./localStorage";

const tokenKey = "token";
const userIdKey = "userId";

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