import React from "react";

const DEFAULT_CONTEXT = {
    dark : true,
    toggle : null
}

const ThemeContext = React.createContext(DEFAULT_CONTEXT);

export default ThemeContext;