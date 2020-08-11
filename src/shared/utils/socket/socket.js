import io from "socket.io-client";

import { socketUrl } from "../../constants";


//remove after changing
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
    SUCCESS: 10,
    USERLEAVEROOM : 11
});




export var socket = null;
export var roomId = null;

var defaultData = {
    songId: null,
    time: 0,
    paused: true 
};


export const connectSocket = (rId) => {

    roomId = rId;

    return new Promise((res, rej) => {  
        socket = io(socketUrl, {
            path: "/socket"
        });
    
        socket.on("connect", () => {
            console.log("connected to server socket server");
            socket.emit(constants.USERJOINROOM, {
                roomId: 123
            })
        });

        socket.on(constants.JOINSUCCESS, (data) => {
            res({
                ...defaultData,
                ...data
            });
        })
    }); 
}

export const disconnectSocket = () => {
    socket.disconnect();
}


export const joinSuccess = () => {
    return new Promise((res, rej) => {
        socket.on(constants.JOINSUCCESS, (data) => {
            res(data);
        })
    });
}

// remove later
export const emitPause = (roomId) => {
    socket.emit(constants.USERINPUT, {
        type: constants.controls.PAUSE,
        roomId: roomId
    });
}


//remove after finished with room HOC
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