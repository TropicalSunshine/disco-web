import api from "./Api";
import { User } from "shared/utils/storage";

export const createRoom = (
                            {
                                name = "room", 
                                isPrivate = false, 
                                description = "", 
                                creator = User.userId.get()
                            } = {}
                        ) => api.post("", {
    query : `mutation createRoom($name : String!, $private: !Boolean,
            $description : String! , $creator : String!){
                createRoom({
                    name : $name,
                    private : $private
                }){
                    roomId
                    error
                    message
                    status
                }
            }`,
    variables : {
        name,
        private : isPrivate,
        description,
        creator
    }
})