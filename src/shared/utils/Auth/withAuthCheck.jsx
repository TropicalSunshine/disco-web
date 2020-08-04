
import React from "react";
import AuthContext from "./AuthContext";
import { Redirect } from "react-router-dom";

const withAuthCheck = Component => class extends React.Component {

    render() {
        return (
            <AuthContext.Consumer>
                {
                    (auth) => {
                        var props = {
                            ...this.props,
                            auth: auth
                        }

                        //send a checksession req uest to server for check
                        return (auth.isLoggedIn) ? <Component {...props}/> : <Redirect to="/" />;
                    }
                }
            </AuthContext.Consumer>
        )
    }
}

export default withAuthCheck;