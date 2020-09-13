import { socket, roomId } from "./socket";
import constants from "./constants";

export const emitStepUp = _ => {
    socket.emit(constants.DJ.STEP_UP, { roomId });
}

export const addStepUpListener = fn => {
    socket.on(constants.DJ.STEP_UP, fn);
}

export const emitStepDown = _ => {
    socket.emit(constants.DJ.STEP_DOWN, { roomId });
}

export const addStepDownListener = fn => {
    socket.on(constants.DJ.STEP_DOWN, fn);
}

export const addRequestListener = fn => {
    socket.on(constants.DJ.REQUEST, fn);
}

export const removeRequestListener = _ => {
    socket.off(constants.DJ.REQUEST);
}

export const emitResponse = (data) => {
    socket.emit(constants.DJ.RESPOND, data);
}
