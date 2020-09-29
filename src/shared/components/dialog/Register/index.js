import Register from "./Register";

import withDialog from "../withDialog";
import { withAuthProvider } from "shared/context/auth";
import { withRouter } from "react-router-dom";

export default withRouter(withAuthProvider(withDialog(Register)));