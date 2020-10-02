import React from "react";

import UserContext from "./UserContext";
import useUserProvider from "./useUserProvider";

function UserProvider({ children }) {

    const userProvider = useUserProvider();

    return (
        <UserContext.Provider value={{
            ...userProvider
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;