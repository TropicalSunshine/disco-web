import React from "react";

import { HistoryPropTypes } from "shared/types";
import AuthContext from "./AuthContext";

function AuthConsumer(props){
    const { children } = props;

    return (
        <AuthContext.Consumer>
            {
                auth=> {
                    return React.Children.map(children, child => React.cloneElement(child, {
                        auth
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