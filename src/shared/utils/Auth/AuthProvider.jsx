import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import AuthContext from "./AuthContext";
import useAuthProvider from "./useAuthProvider"

function AuthProvider({children}){

    const [ a, setA ] = useState(true);


    useEffect(() => {
        setA(false);
    }, [])


    const auth = useAuthProvider();
    
    console.log("auth provider", auth);
    console.log("a", a);
    
    return (
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;
