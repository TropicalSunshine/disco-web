import React from "react";

const DEFAULT_AUTH = {
    userId: null,
    token: null,
    isLoggedIn: false,
    user: {}
};

const AuthContext = React.createContext(DEFAULT_AUTH);

export default AuthContext;