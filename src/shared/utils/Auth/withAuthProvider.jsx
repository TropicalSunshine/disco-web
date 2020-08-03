import React, { PureComponent } from "react";
import AuthContext from "./AuthContext";

const withAuth = Component => class extends PureComponent {

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