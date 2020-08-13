import { socket, roomId } from "./socket";
import constants from "./constants";


export const emitPause = () => {
    socket.emit(constants.USERINPUT, {
        type: constants.controls.PAUSE,
        roomId: roomId
    });
}

export const addPauseListener = fn => {
    socket.on(constants.controls.PAUSE, fn);
}

export const emitPlay = () => {
    socket.emit(constants.USERINPUT, {
        type: constants.controls.PLAY,
        roomId: roomId
    })
}

export const addPlayListener = fn => {
    socket.on(constants.controls.PLAY, fn);
}

export const addUpdateListener = fn => {
    socket.on(constants.UPDATE, fn);
}


export const emitChangeSong = (playerState) => {
    
    
    var data = {
        ...playerState,
        roomId
    }
    
    socket.emit(constants.USERCHANGESONG, data);    
}