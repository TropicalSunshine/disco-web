import { PureComponent } from "react";

import AuthConsumer from "./AuthConsumer";
import AuthProvider from "./AuthProvider"; 

const withAuth = Component => class extends PureComponent {

    render() {
        return(
            <AuthProvider>
                <AuthConsumer {...this.props}>
                    <Component {...this.props} />
                </AuthConsumer>
            </AuthProvider>

        ) 
    }   
}

export default withAuth;