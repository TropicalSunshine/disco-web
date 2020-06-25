import io from "socket.io-client";

const constants = require("./constants");

const HOSTURL = "http://" + window.location.host;

var urlarray = window.location.pathname.split('/');
export const roomId = 123;

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socketUrl = socketProtocol + "://" + "localhost:3001";




export const socket = io(socketUrl, {
    path: "/socket"
});



const connectSocketPromise = new Promise((resolve, reject) => {
    socket.on("connect", () => {
        console.log("connected to server socket server");
        socket.emit(constants.USERJOINROOM, {
            roomId: 123
        })

        resolve();
    })
})





export const connect = () => {
    return connectSocketPromise;
}

export const getcurrentState = () => {
    return fetch(HOSTURL + "/rooms/getroomstate/" + roomId, {
        method: "GET"
    });
}



