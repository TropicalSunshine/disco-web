import React from "react";

const default_auth = {
    userId : null,
    token : null
};

const AuthContext = React.createContext(default_auth);

export default AuthContext;