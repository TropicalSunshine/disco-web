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

export const removePauseListener = () => {
    socket.off(constants.controls.PAUSE);
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

export const removePlayListener = () => {
    socket.off(constants.controls.PLAY);
}

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