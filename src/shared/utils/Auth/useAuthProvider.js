import { useState, useEffect } from "react";

import { user as userStore } from "../storage"; 
import { user as userApi } from "../api";

function useAuth(){

    const [userId, setUserId] = useState(false);
    const [token, setToken] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = async (email, password) => {
        const result = await userApi.login(email, password);
        const response = result.data.data.login;

        if(response.error !== null) {
            console.error(response.error);
            throw new Error(response.error);
        } 
        
        if(response.status === 500 ){
            console.error("server error");
            throw new Error(response.error);
        }

        userStore.token.set(response.token);
        setToken(response.token);
        userStore.userId.set(response.userId);
        setUserId(response.userId);

        setIsLoggedIn(true);

        return response;
    }

    const register = async (email, password, username) => {
        const result = await userApi.register(email, password, username);
        const response = result.data.data.register;

        if(response.error !== null) {
            console.error(response.error);
            throw new Error(response.error);
        }

        if(response.status === 500 ) {
            console.error("server error");
            throw new Error(response.error);
        }

        return response;
    }

    const logout = async () => null

    const fetchState = () => {

        const token = userStore.token.get();
        setToken(token);
        const userId = userStore.userId.get();
        setUserId(userId);

    }



    useEffect(fetchState, []);


    return {
        login,
        register,
        userId,
        token,
        isLoggedIn
    }

}

export default useAuth;


