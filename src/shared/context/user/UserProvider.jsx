import React, { useEffect, useState } from "react";

import { User as UserApi } from "shared/utils/api";
import { useAuth } from "shared/context/auth";
import UserContext from "./UserContext";

function UserProvider({ children }) {

    const { isLoggedIn } = useAuth();
    const [user, setUser] = useState({});

    const getUser = async () => {
        const response = await UserApi.me();
        const user = response.data.data.me;
        setUser(user);
    }

    useEffect(() => {
        if (!isLoggedIn) return;
        getUser();
    }, [isLoggedIn])


    return (
        <UserContext.Provider value={{
            user
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;