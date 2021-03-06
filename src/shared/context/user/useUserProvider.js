import { useState, useEffect } from "react";
import { User as UserApi } from "shared/utils/api";
import { useAuth } from "shared/context/auth";
import { User as UserStore } from "shared/utils/storage";


const EXPIRATION_TIME = 5 * 60 * 60 * 1000; //5hrs


function useUserProvider() {

    const { isLoggedIn, refreshToken } = useAuth();
    const [user, setUser] = useState({});
    const [isUserLoading, setIsUserLoading] = useState(false)

    const getUser = async () => {
        const response = await UserApi.me();
        const userProfile = response.data.data.me;
        setIsUserLoading(true);

        setUser(userProfile);
    }


    const checkToken = async () => {
        var storedLastRt = UserStore.lastRt.get();
        if (!storedLastRt) return;
        var lastRt = Number(storedLastRt);

        //add expiration time to last refreshed time    
        if((lastRt + EXPIRATION_TIME) <= Date.now()){
            setIsUserLoading(true);
            await refreshToken();
            setIsUserLoading(false);
        }
    }

    /* eslint-disable */
    useEffect(() => {
        if (isLoggedIn) {
            checkToken();
            getUser();
        }
        else {
            setIsUserLoading(true);
        }

        return;
    }, [isLoggedIn])
    /* eslint-enable */

    return {
        user,
        getUser,
        checkToken,
        
        isUserLoading
    }
}

export default useUserProvider;