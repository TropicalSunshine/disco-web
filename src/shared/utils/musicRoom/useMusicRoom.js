import { useContext } from "react";
import MusicRoomContext from "./MusicRoomContext";

const useMusicRoom = () => {
    return useContext(MusicRoomContext);
};

export default useMusicRoom;