import React from "react";
import AuthContext from "./AuthContext";

const withAuth = Component => class extends React.Component {

    render() {
        
        return (
            <AuthContext.Consumer>
                {
                    (auth) => {

                        var props = {
                            ...this.props,
                            auth: auth
                        };

                        return <Component {...props} />;
                    }
                }
            </AuthContext.Consumer>
        ) 
    }   
}

export default withAuth;