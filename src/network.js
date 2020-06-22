import io from "socket.io-client";

const constants = require("./constants");

const HOSTURL = "http://" + window.location.host;

var urlarray = window.location.pathname.split('/');
export const roomId = urlarray[urlarray.length - 1];



console.log("roomid: ", roomId);
export const socket = io(HOSTURL, {
    path: "/socket"
});


const connectSocketPromise = new Promise((resolve, reject) => {
    socket.on("connect", () => {
        console.log("connected to server socket server");
        socket.emit(constants.USERJOINROOM, {
            roomId: roomId
        })

        resolve();
    })
})





export const connect = () => {
    connectSocketPromise.then(() => {
    })
}

export const getcurrentState = () => {
    return fetch(HOSTURL + "/rooms/getroomstate/" + roomId, {
        method: "GET"
    });
}



