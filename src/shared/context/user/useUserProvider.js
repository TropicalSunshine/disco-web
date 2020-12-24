import { useState, useEffect } from "react";
import { User as UserApi } from "shared/utils/api";
import { useAuth } from "shared/context/auth";

function useUserProvider() {

    const { isLoggedIn } = useAuth();
    const [user, setUser] = useState({});
    const [isUserLoaded, setIsUserLoaded] = useState(false)

    const getUser = async () => {
        const response = await UserApi.me();
        const userProfile = response.data.data.me;
        setIsUserLoaded(true);

        setUser(userProfile);
    }

    useEffect(() => {
        if (isLoggedIn) getUser();
        else {
            setIsUserLoaded(true);
        }
        return;
    }, [isLoggedIn])

    return {
        user,
        getUser,
        isUserLoaded
    }
}

export default useUserProvider;