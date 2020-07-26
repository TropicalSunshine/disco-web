import React from "react";

import PropTypes from "prop-types";
import HistoryPropTypes from "shared/types";
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
    history :
}

export default AuthConsumer;