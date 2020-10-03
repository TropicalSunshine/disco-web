import Login from "./Login";

import withDialog from "../withDialog";
import { withAuthProvider } from "shared/context/auth";
import { withUserProvider } from "shared/context/user";
import { withRouter } from "react-router-dom";


export default withRouter(
    withUserProvider(
        withAuthProvider(withDialog(Login))
    )
); 