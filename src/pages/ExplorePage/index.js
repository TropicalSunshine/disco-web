import ExplorePage from "./ExplorePage";
import { withAuthCheck } from "shared/context/auth";

export default withAuthCheck(ExplorePage);