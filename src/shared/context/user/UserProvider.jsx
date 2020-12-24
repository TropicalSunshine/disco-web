import React from "react";

import { LoaderPage } from "shared/components";

import UserContext from "./UserContext";
import useUserProvider from "./useUserProvider";


function UserProvider({ children }) {

    const userProvider = useUserProvider();
    
    return (
        <UserContext.Provider value={{
            ...userProvider
        }}>
            {
                (!userProvider.isUserLoaded) && <LoaderPage/>
            }
            {
                (userProvider.isUserLoaded) && (children)
            }
        </UserContext.Provider>
    )
}

export default UserProvider;