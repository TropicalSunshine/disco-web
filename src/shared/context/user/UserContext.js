import React from "react";

const DEFAULT_USER = {
    username: null
}

const UserContext = React.createContext(DEFAULT_USER);

export default UserContext;