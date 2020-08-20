import { socket, roomId } from "./socket";
import constants from "./constants";
import { User as UserAccount } from "shared/utils/storage";

export const sendMessage = (content="") => {

    const userId = UserAccount.userId.get();

    socket.emit(constants.SEND_MESSAGE, {
        roomId,
        userId,
        content
    });
}


export const addRecieveMessageListener = fn => {
    socket.on(constants.RECIEVE_MESSAGE, fn);
}

export const removeRecieveMessageListener = fn => {
    socket.off(constants.RECIEVE_MESSAGE);
}

