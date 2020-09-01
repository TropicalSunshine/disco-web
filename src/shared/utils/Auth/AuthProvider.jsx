import React from "shared/utils/Auth/node_modules/react";

import AuthContext from "./AuthContext";
import useAuthProvider from "./useAuthProvider"

function AuthProvider({children}){
    
    const auth = useAuthProvider();
    

    return (
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;
