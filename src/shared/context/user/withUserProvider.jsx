import React from "react";
import UserContext from "./UserContext";

const withUserProvider = Component => class extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {
                    (user) => {
                        var props = {
                            ...this.props,
                            user
                        };

                        return <Component {...props} />
                    }
                }
            </UserContext.Consumer>
        );
    }
}

export default withUserProvider;