import Api from "./api";
import * as User from "./user";
import * as Room from "./Room";
import * as Message from "./Message";

export {
    User,
    Room,
    Message
}

Api.User = User;
Api.Room = Room;
Api.Message = Message;

export default Api;