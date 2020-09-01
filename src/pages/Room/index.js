import Room from "./Room";
import { withMusicRoomProvider } from "shared/utils/musicRoom";
import { withAuthCheck } from "shared/utils/Auth";

export default withAuthCheck(withMusicRoomProvider(Room));