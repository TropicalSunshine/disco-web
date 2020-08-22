import Api from "./Api";
import * as User from "./User";
import * as Room from "./Room";
import * as Message from "./Message";

export {
    User,
    Room,
    Message
}

Api.User = User;

export default Api;