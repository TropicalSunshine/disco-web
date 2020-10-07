import React from "react";
import AuthContext from "./AuthContext.js";

const withAuthProvider = Component => class extends React.Component {

    render() {

        return (
            <AuthContext.Consumer>
                {
                    (auth) => {

                        var props = {
                            ...this.props,
                            auth
                        };

                        return <Component {...props} />;
                    }
                }
            </AuthContext.Consumer>
        )
    }
}

export default withAuthProvider;