import React from "react";
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