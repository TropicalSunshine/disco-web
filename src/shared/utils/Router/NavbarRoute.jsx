import React from "react";
import { Route } from "react-router-dom";
import Navbar from "pages/Navbar";

function NavbarRoute({ component: Component, ...rest }) {

    return (
        <Route
            render={props => (
                <>
                    <Navbar />
                    <Component {...props} />
                </>
            )}
            {...rest}
        />
    )
};

export default NavbarRoute;