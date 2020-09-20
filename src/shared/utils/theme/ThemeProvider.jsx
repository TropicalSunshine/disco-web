import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

function ThemeProvider ({ children }) {

    const [ dark, setDark ] = useState(true);

    const toggle = () => setDark(prevDark => setDark(!prevDark))

    return (
        <ThemeContext.Provider value={{
            toggle,
            dark
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;