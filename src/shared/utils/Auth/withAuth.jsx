const { PureComponent } = require("react");
import { PureComponent } from "react";

const withAuth = Component => class extends PureComponent {

    render(){
        return <Component {...this.props} />
    }   
}

export default withAuth;