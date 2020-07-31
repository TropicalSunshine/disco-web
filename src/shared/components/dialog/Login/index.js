import Login from "./Login";

import withDialog from "../withDialog";
import { withProviderAuth } from "shared/utils/auth";
import { withRouter } from "react-router-dom";


export default withRouter(withProviderAuth(withDialog(Login))); 