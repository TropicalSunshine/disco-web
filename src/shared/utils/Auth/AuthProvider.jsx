import React from "react";
import PropTypes from "prop-types";

import AuthContext from "./AuthContext";

function AuthProvider({children}){
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
}
