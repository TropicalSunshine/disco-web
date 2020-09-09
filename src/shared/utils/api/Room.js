import api from "./Api";
import { User as UserStorage } from "shared/utils/storage";


export const createRoom = (
                            {
                                name = "room", 
                                isPrivate = false, 
                                description = ""
                            } = {}
                        ) => api.post("", {
    query : `mutation createRoom($name : String!, $private: Boolean!,
            $description : String! , $creator : String!){
                createRoom(input : {
                    name : $name
                    private : $private
                    description : $description
                    creator : $creator
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
        creator : UserStorage.userId.get()
    }
})

const DEFAULT_LIMIT = 10;
const DEFAULT_LAST_ID = '0';

export const rooms = (limit = DEFAULT_LIMIT, 
    last_id = DEFAULT_LAST_ID) => api.post("", {
        query :  
        `
        query rooms( $limit : Int! , $last_id : String! ) {
            rooms( limit : $limit, last_id : $last_id ){ 
                id
                name
                description
                num_listeners
            }
        }
        `,
        variables : {
            limit,
            last_id
        }
    
    })


export const Rooms = async ( 
    limit = DEFAULT_LIMIT,  
    last_id = DEFAULT_LAST_ID) => {
        
        if(!limit) limit = DEFAULT_LIMIT;
        if(!last_id) last_id = DEFAULT_LAST_ID;
        
        const response = await rooms(limit, last_id);


        if(response.data.data) {
            return response.data.data.rooms;
        } else {
            throw new Error("Server error");
        }
} 

export const joinRoom = (roomId) => api.post("", {
    query : `
    mutation joinRoom( $roomId : String!, $userId : String! ) {
        joinRoom(userId : $userId, roomId : $roomId){
          _id
          name
          time_created
          num_listeners
          creator {
            _id
            username
          }
          members {
            _id
            username
          }
          description
        }
      }
    `,
    variables : {
        userId : UserStorage.userId.get(),
        roomId
    }
});

export const leaveRoom = (roomId) => api.post("", {
    query : `
    mutation leaveRoom ($userId : String!, $roomId : String!) {
        leaveRoom(userId : $userId, roomId : $roomId ) {
          status
          message
          error
        }
      }
    `,
    variables : {
        userId : UserStorage.userId.get(),
        roomId
    }
});