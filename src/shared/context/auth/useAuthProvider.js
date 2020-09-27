import { useState, useEffect, useMemo } from "react";

import { User as UserStore } from "shared/utils/storage";
import { User as UserApi } from "shared/utils/api";
import { setAuthHeader } from "shared/utils/api/api";

import { useHistory } from "react-router-dom";

function useAuth() {

    const history = useHistory();
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = async (email, password) => {
        const result = await UserApi.login(email, password);
        const response = result.data.data.login;

        if (response.error !== null) {
            console.error(response.error);
            throw new Error(response.error);
        }

        if (response.status === 500) {
            console.error("server error");
            throw new Error(response.error);
        }

        UserStore.token.set(response.token);
        setToken(response.token);
        setAuthHeader(response.token);
        UserStore.userId.set(response.userId);
        setUserId(response.userId);

        setIsLoggedIn(true);


        return response;
    }

    const register = async (email, password, username) => {
        const result = await UserApi.register(email, password, username);
        const response = result.data.data.register;

        if (response.error !== null) {
            console.error(response.error);
            throw new Error(response.error);
        }

        if (response.status === 500) {
            console.error("server error");
            throw new Error(response.error);
        }

        return response;
    }

    const logout = async () => {

        await UserApi.logout(UserStore.token.get());

        history.push("/");
        UserStore.token.clear();
        UserStore.userId.clear();
        setIsLoggedIn(false);
        setToken(null);
        setUserId(null);

    }

    const fetchState = () => {

        const token = UserStore.token.get();
        setToken(token);
        const userId = UserStore.userId.get();
        setUserId(userId);

        if (token && userId) {
            setIsLoggedIn(true);
        }

    }



    useEffect(fetchState, []);

    /* eslint-disable */
    return useMemo(() => ({
        login,
        logout,
        register,

        userId,
        token,
        isLoggedIn
    }), [userId, token, isLoggedIn]);
    /* eslint-enable */

}

export default useAuth;


