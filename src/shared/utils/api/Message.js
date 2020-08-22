import api from "./Api";
import { User as UserStorage } from "shared/utils/storage";

const DEFAULT_ROOM_ID = "0";
const DEFAULT_LAST_ID = "0";
const DEFAULT_LIMIT = 10;

export const getRoomMessage = async (
    roomId = DEFAULT_ROOM_ID,
    last_id = DEFAULT_LAST_ID,
    limit = DEFAULT_LIMIT
) => {
        const response = await api.post("", {
        query : `
            query messages( $roomId : String!, 
                            $last_id : String!,
                            $limit : Int! ){
                    messages (
                        roomId : $roomId,
                        last_id : $last_id,
                        limit : $limit
                    ){
                        id
                        content
                        sender
                        time_created
                    }
            }
        `,
        variables : {
            roomId,
            last_id,
            limit
        }
    });

    if(response.data.data){
        return response.data.data.messages;
    } else {
        throw new Error("Server Error");
    }
}
