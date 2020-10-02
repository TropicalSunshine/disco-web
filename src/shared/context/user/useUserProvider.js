import { useState, useEffect } from "react";
import { User as UserApi } from "shared/utils/api";
import { useAuth } from "shared/context/auth";

function useUserProvider() {

    const { isLoggedIn } = useAuth();
    const [user, setUser] = useState({});

    const getUser = async () => {
        const response = await UserApi.me();
        const userProfile = response.data.data.me;

        setUser(userProfile);
    }

    useEffect(() => {
        if (isLoggedIn) getUser();
        return;
    }, [isLoggedIn])

    return {
        user,
        getUser
    }
}

export default useUserProvider;