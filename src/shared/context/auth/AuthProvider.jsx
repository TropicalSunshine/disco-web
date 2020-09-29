import React from "react";

import AuthContext from "./AuthContext";
import useAuthProvider from "./useAuthProvider"

function AuthProvider({ children }) {

    const auth = useAuthProvider();

    return (
        <AuthContext.Provider value={auth}>
            { children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
