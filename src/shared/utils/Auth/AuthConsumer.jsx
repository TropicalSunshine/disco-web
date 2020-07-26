import React from "react";

import { HistoryPropTypes } from "shared/types";
import AuthContext from "./AuthContext";

function AuthConsumer(props){
    const { children } = props;

    return (
        <AuthContext.Consumer>
            {
                authContext => {
                    return React.Children.map(children, child => React.cloneElement(child, {
                        authContext
                    }));
                }
            }
        </AuthContext.Consumer>
    )
}

AuthConsumer.propTypes = {
    ...HistoryPropTypes
}

export default AuthConsumer;