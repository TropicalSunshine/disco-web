import CreateRoomPage from "./CreateRoomPage";
import { HistoryPropTypes } from "shared/types";
import { withAuthCheck, withAuthProvider } from "shared/utils/Auth";

CreateRoomPage.propTypes = {
    ...HistoryPropTypes
};

export default withAuthProvider(withAuthCheck(CreateRoomPage));