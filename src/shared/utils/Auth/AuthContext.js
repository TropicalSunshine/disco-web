import React from "react";

const default_auth = {
    userId : null,
    token : null,
    isLoggedIn : false
};

const AuthContext = React.createContext(default_auth);

export default AuthContext;