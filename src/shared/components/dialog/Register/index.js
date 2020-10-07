import Register from "./Register";

import withDialog from "../withDialog";
import { withUserProvider } from "shared/context/user";
import { withAuthProvider } from "shared/context/auth";
import { withRouter } from "react-router-dom";

console.log(typeof (withAuthProvider));

const RegisterWithoutDialog = withRouter(
    withUserProvider(
        Register
    )
);

export {
    RegisterWithoutDialog
}


export default withRouter(
    withUserProvider(
        withAuthProvider(withDialog(Register))
    )
);