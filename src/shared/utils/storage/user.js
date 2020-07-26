import sessionStorage from "./sessionStorage";

const tokenKey = "token";
const userIdKey = "userId";

export const token = {
    get : () => sessionStorage.getItem(tokenKey),
    set : token => sessionStorage.setItem(tokenKey, token)  
}

export const userId = {
    get : () => sessionStorage.getItem(userIdKey),
    set : userId => sessionStorage.getItem(userId, token)
}