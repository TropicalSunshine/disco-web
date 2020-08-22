import io from "socket.io-client";
import { User as UserStorage } from "shared/utils/storage";

import { socketUrl } from "../../constants";
import constants from "./constants";

console.log(UserStorage.token.get());
console.log("herere");
export var socket = io(socketUrl, {
    path: "/socket",
    autoConnect : false,
    query : {
        token : null
    }
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

        //add token
        const token = UserStorage.token.get();
        if(!token) console.error("trying to connect to server while user is not logged in")
        socket.io.opts.query.token = token;
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