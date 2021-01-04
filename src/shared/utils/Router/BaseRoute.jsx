import React from "react";
import { Route } from "react-router-dom";

import { withRTCheck } from "shared/context/user";

function BaseRoute({ component : Component, ...rest }) {
    return (
        <Route render={(props) => (
            <Component {...props} />
        )}
        {...rest}
        />
    )
}

export default withRTCheck(BaseRoute);