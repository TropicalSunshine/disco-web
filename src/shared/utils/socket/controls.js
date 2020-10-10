import { socket } from "./socket";
import constants from "./constants";


const addUpdateListener = fn => socket.on(constants.UPDATE, fn);
const removeUpdateListener = () => socket.off(constants.UPDATE);

const addChangeSongListener = (fn) => socket.on(constants.USERCHANGESONG, fn);
const removeChangeSongListener = () => socket.off(constants.USERCHANGESONG);

const addUserJoinRoomListener = fn => socket.on(constants.USERJOINROOM, fn);
const removeUserJoinRoomListener = () => socket.off(constants.USERJOINROOM);

const addUserLeaveRoomListener = fn => socket.on(constants.USERLEAVEROOM, fn);
const removeUserLeaveRoomListener = () => socket.off(constants.USERLEAVEROOM);

const addUserDupListener = fn => socket.on(constants.USER_DUP, fn);
const removeUserDupListener = () => socket.off(constants.USER_DUP);

export {
    addUpdateListener,
    removeUpdateListener,
    addChangeSongListener,
    removeChangeSongListener,
    addUserJoinRoomListener,
    removeUserJoinRoomListener,
    addUserLeaveRoomListener,
    removeUserLeaveRoomListener,
    addUserDupListener,
    removeUserDupListener
}
