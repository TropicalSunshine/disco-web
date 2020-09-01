import Room from "./Room";
import { withMusicRoomProvider } from "shared/utils/musicRoom";
import { withAuthCheck } from "shared/utils/asb";

export default withAuthCheck(withMusicRoomProvider(Room));