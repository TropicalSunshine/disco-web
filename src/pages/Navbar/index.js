import Navbar from "./Navbar";
import { withProviderAuth } from "shared/utils/auth";
import { withRouter } from "react-router-dom";

export default withRouter(withProviderAuth(Navbar));