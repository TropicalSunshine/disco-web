import { useContext } from "react";
import MusicRoomContext from "./MusicRoomContext";

const useMusicRoom = () => useContext(MusicRoomContext);

export default useMusicRoom;