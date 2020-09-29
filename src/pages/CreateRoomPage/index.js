import CreateRoomPage from "./CreateRoomPage";
import { HistoryPropTypes } from "shared/types";
import { withAuthCheck, withAuthProvider } from "shared/context/auth";

CreateRoomPage.propTypes = {
    ...HistoryPropTypes
};

export default withAuthProvider(withAuthCheck(CreateRoomPage));