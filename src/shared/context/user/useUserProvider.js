import { useState, useEffect } from "react";
import { User as UserApi } from "shared/utils/api";
import { useAuth } from "shared/context/auth";


const EXPIRATION_TIME = 5 * 60 * 60 * 1000; //5hrs


function useUserProvider() {

    const { isLoggedIn } = useAuth();
    const [user, setUser] = useState({});
    const [isUserLoading, setIsUserLoading] = useState(false)

    const getUser = async () => {
        const response = await UserApi.me();
        const userProfile = response.data.data.me;
        setIsUserLoading(true);

        setUser(userProfile);
    }


    const checkToken = () => {
        var currentTime
    }

    const refreshToken = async () => {

    }

    useEffect(() => {
        checkToken();
        if (isLoggedIn) getUser();
        else {
            setIsUserLoading(true);
        }
        return;
    }, [isLoggedIn])

    return {
        user,
        getUser,
        isUserLoading
    }
}

export default useUserProvider;