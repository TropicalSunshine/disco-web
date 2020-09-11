import io from "socket.io-client";
import { User as UserStorage } from "shared/utils/storage";

import { socketUrl } from "../../constants";
import constants from "./constants";


export var socket = io(socketUrl, {
    path: "/socket",
    autoConnect : false,
    query : {
        token : null
    }
});

export var roomId;

var defaultData = {
    songId: null,
    time: 0,
    paused: true 
};

const DEFAULT_ROOM_ID = '0';
export const connectSocket = (rId = DEFAULT_ROOM_ID) => {

    console.log(`[ROOM ID] : ${rId}`);
    roomId = rId;
    
    return new Promise((res, rej) => {  

        //add token 
        const token = UserStorage.token.get();
        if(!token) throw new Error("User not signed in can't connect to room");
        socket.io.opts.query.token = token;
        socket.connect();
    
        socket.on("connect", () => {
            
            socket.emit(constants.USERJOINROOM, {
                roomId: roomId,
                userId: UserStorage.userId.get()
            });
        });

        socket.on("connect_error", err => {
            console.error(err);
        })

        socket.on("connect_failed", err => {
            console.error(err);
        });

        socket.on("error", err=> {
            console.error(err);
        })

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