import Navbar from "./Navbar";
import { withAuthProvider } from "shared/context/auth";
import { withRouter } from "react-router-dom";

export default withAuthProvider(withRouter(Navbar));