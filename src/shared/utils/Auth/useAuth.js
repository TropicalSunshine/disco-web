import { useState, useEffect } from "react";

import { user as userStore } from "../storage"; 
import { user as userApi } from "../api";

function useAuth(){

    const login = async (email, password) => {
        const result = await userApi.login(email, password);
        const response = result.data.data.login;

        if(response.error !== null) {
            console.error(response.error);
            throw new Error(response.error);
        } 
        
        if(response.status === 500 )
        {
            console.error("server error");
            throw new Error(response.error);
        }

        userStore.token.set(response.token);
        userStore.userId.set(response.userId);

    }

    const register = async () => {

    }

    const logout = async () => {

    }

    const fetchState = () => {

    }

    useEffect();


    return {

    }


}


