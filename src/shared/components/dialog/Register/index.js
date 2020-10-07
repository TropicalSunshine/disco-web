import Register from "./Register";

import withDialog from "../withDialog";
import { withUserProvider } from "shared/context/user";
import { withAuthProvider } from "shared/context/auth";
import { withRouter } from "react-router-dom";

const RegisterWithoutDialog = withRouter(
    withAuthProvider(
        withUserProvider(Register)
    )
);

export {
    RegisterWithoutDialog
};

export default withRouter(
    withAuthProvider(
        withUserProvider(withDialog(Register))
    )
);