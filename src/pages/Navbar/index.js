import Navbar from "./Navbar";
import { withAuthProvider } from "shared/utils/Auth";
import { withRouter } from "react-router-dom";

export default withAuthProvider(withRouter(Navbar));