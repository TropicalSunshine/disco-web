import io from "socket.io-client";

import { socketUrl } from "../../constants";


export const constants = Object.freeze({
    USERJOINROOM: 1,
    USERCREATEROOM: 2,
    USERCHANGESONG: 3,
    USERINPUT: 4,
    controls: {
        PLAY: 5,
        PAUSE: 6,
        SEEK:  7
    },
    JOINSUCCESS: 8,
    UPDATE: 9,
    SUCCESS: 10
});




export const socket = io(socketUrl, {
    path: "/socket"
});

const connectSocketPromise = new Promise((res, rej) => {  
    socket.on("connect", () => {
        console.log("connected to server socket server");
        socket.emit(constants.USERJOINROOM, {
            roomId: 123
        })
        res();
    });
})

const joinSuccessPromise = new Promise((res, rej) => {
    socket.on(constants.JOINSUCCESS, (data) => {
        res(data);
    })
})

export const connectSocket = () => {
    return connectSocketPromise;
}


export const joinSuccess = () => {
    return joinSuccessPromise;
}


export const emitPause = (roomId) => {
    socket.emit(constants.USERINPUT, {
        type: constants.controls.PAUSE,
        roomId: roomId
    });
}

export const emitPlay = (roomId) => {
    socket.emit(constants.USERINPUT, {
        type: constants.controls.PLAY,
        roomId: roomId
    })
}

export const emitChangeSong = (roomId, player) => {
    var data = player.getState();
    data.roomId = roomId;
    socket.emit(constants.USERCHANGESONG, data);    
}

export default {
    emitPlay,
    emitChangeSong,
    emitPause,
    joinSuccess,
    constants,
    socket
}