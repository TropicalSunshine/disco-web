import Room from "./Room";
import { withMusicRoomProvider } from "shared/context/musicRoom";
import { withAuthCheck } from "shared/context/auth";

export default withAuthCheck(withMusicRoomProvider(Room));