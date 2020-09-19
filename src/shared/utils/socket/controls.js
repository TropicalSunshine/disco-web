import { socket, roomId } from "./socket";
import constants from "./constants";


export const addUpdateListener = fn => {
    socket.on(constants.UPDATE, fn);
}

export const removeUpdateListener = () => {
    socket.off(constants.UPDATE);
}

export const addChangeSongListener = (fn) => {
    socket.on(constants.USERCHANGESONG, fn);
}

export const removeChangeSongListener = () => {
    socket.off(constants.USERCHANGESONG);
}

export const addUserJoinRoomListener = fn => {
    socket.on(constants.USERJOINROOM, fn);
}

export const removeUserJoinRoomListener = () => {
    socket.off(constants.USERJOINROOM);
}

export const addUserLeaveRoomListener = fn => {
    socket.on(constants.USERLEAVEROOM, fn);
}

export const removeUserLeaveRoomListener = () => {
    socket.off(constants.USERLEAVEROOM);
}