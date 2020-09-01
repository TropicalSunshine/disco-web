import Login from "./Login";

import withDialog from "../withDialog";
import { withAuthProvider } from "shared/utils/asb";
import { withRouter } from "react-router-dom";


export default withRouter(withAuthProvider(withDialog(Login))); 