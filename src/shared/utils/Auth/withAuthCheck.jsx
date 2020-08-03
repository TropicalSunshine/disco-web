
import React, { PureComponent } from "react";
import AuthContext from "./AuthContext";
import { Redirect } from "react-router-dom";

const withAuthCheck = Component => class extends PureComponent {

    render() {
        return (
            <AuthContext.Consumer>
                {
                    (auth) => {
                        var props = {
                            ...this.props,
                            auth: auth
                        }
                        //send a checksession request to server for check

                        return (auth.isLoggedIn) ? <Component {...props}/> : <Redirect to="/" />;
                    }
                }
            </AuthContext.Consumer>   
        )
    }
}

export default withAuthCheck;