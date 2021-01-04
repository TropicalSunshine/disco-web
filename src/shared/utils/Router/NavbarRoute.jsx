import React from "react";
import { Route } from "react-router-dom";

import Navbar from "pages/Navbar";
import { withRTCheck } from "shared/context/user";

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

export default withRTCheck(NavbarRoute);