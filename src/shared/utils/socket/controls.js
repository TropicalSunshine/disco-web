import { socket, roomId } from "./socket";
import constants from "./constants";


export const addUpdateListener = fn => {
    socket.on(constants.UPDATE, fn);
}

export const removeUpdateListener = () => {
    socket.off(constants.UPDATE);
}



export const emitChangeSong = (playerState) => {
    
    
    var data = {
        ...playerState,
        roomId
    }
    
    socket.emit(constants.USERCHANGESONG, data);    
}

export const addChangeSongListener = (fn) => {
    socket.on(constants.USERCHANGESONG, fn);
}

export const removeChangeSongListener = () => {
    socket.off(constants.USERCHANGESONG);
}