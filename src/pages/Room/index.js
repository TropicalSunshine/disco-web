import Room from "./Room";
import { withMusicRoomProvider } from "shared/context/musicRoom";
import withAuthPage from "shared/context/auth/withAuthPage";

export default withAuthPage(withMusicRoomProvider(Room));