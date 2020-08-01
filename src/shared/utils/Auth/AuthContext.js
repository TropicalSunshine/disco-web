import React from "react";

const default_auth = {
    userId : false,
    token : false,
    isLoggedIn : false
};

const AuthContext = React.createContext(default_auth);

export default AuthContext;