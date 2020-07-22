import sessionStorage from "./sessionStorage";

const tokenKey = "token";
const userIdKey = "userId";

const token = {
    get : () => sessionStorage.getItem(tokenKey),
    set : token => sessionStorage.setItem(tokenKey, token)  
}

const userId = {
    get : () => sessionStorage.getItem(userIdKey),
    set : userId => sessionStorage.getItem(userId, token)
}