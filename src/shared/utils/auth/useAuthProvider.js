import { useState, useEffect, useMemo } from "react";

import { User as userStore } from "../storage"; 
import { User as userApi } from "../api";
import { setAuthHeader } from "shared/utils/api/Api";

function useAuth(){

    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
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
        setAuthHeader(response.token);
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

        if(token && userId){
            setIsLoggedIn(true);
        }

    }



    useEffect(fetchState, []);


    return useMemo(() => ({ 
        login,
        logout,
        register,

        userId,
        token,
        isLoggedIn
    }), [userId, token, isLoggedIn]);

}

export default useAuth;


