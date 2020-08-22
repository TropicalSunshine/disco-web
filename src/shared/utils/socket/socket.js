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

console.log("socketUrl", socketUrl);
export var socket = io(socketUrl, {
    path: "/socket",
    autoConnect : false
});

export var roomId = "5f2afb2c57632700170db74f";

var defaultData = {
    songId: null,
    time: 0,
    paused: true 
};


export const connectSocket = (rId) => {

    //roomId = rId;
    
    return new Promise((res, rej) => {  
        socket.connect();
    
        socket.on("connect", () => {
            
            socket.emit(constants.USERJOINROOM, {
                roomId: roomId
            });
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

export default {
    joinSuccess,
    constants,
    socket
}