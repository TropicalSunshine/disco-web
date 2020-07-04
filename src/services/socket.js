import io from "socket.io-client";

import { constants } from "../constants";


const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socketUrl = socketProtocol + "://" + "localhost:3001";



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

export const connect = () => {
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
