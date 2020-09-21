import sessionStorage from "./sessionStorage";

const tokenKey = "token";
const userIdKey = "userId";

export const token = {
    get : () => sessionStorage.getItem(tokenKey),
    set : token => sessionStorage.setItem(tokenKey, token),
    clear : () => sessionStorage.removeItem(tokenKey);
}

export const userId = {
    get : () => sessionStorage.getItem(userIdKey),
    set : userId => sessionStorage.setItem(userIdKey, userId),
    clear : () => sessionStorage.removeItem(userIdKey);
}