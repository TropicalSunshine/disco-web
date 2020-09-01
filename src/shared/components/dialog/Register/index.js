import Register from "./Register";

import withDialog from "../withDialog";
import { withAuthProvider } from "shared/utils/asb";
import { withRouter } from "react-router-dom";

export default withRouter(withAuthProvider(withDialog(Register)));