import io from "socket.io-client";
import { toast } from "react-toastify";

import { User as UserStorage } from "shared/utils/storage";

import { socketUrl } from "../../constants";
import constants from "./constants";


export var socket = io(socketUrl, {
    path: "/socket",
    autoConnect: false,
    query: {
        token: null
    }
});

var joinRoom = false;

export var roomId;

var defaultData = {
    songId: null,
    time: 0,
    paused: true
};

const DEFAULT_ROOM_ID = '0';

/**
 * connect socket to the room instance
 * 
 */
export const connectSocket = (rId = DEFAULT_ROOM_ID) => {


    console.log(`[ROOM ID] : ${rId}`);
    roomId = rId;

    return new Promise((res, rej) => {

        //add token 
        const token = UserStorage.token.get();
        if (!token) throw new Error("User not signed in can't connect to room");
        socket.io.opts.query.token = token;

        socket.on("connect", () => {


            if (!joinRoom) {
                console.log("emitting join room");
                socket.emit(constants.USERJOINROOM, {
                    roomId: roomId,
                    userId: UserStorage.userId.get()
                });
                joinRoom = true;
            }

        });

        socket.connect();


        socket.on("connect_error", err => {
            toast.warning(err.message);
            rej(err.message);
        })

        socket.on("connect_failed", err => {
            toast.warning(err.message);
            rej(err.message);
        });

        socket.on("error", err => {
            toast.warning(err.message);
            rej(err.message);
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
    joinRoom = false;
}