import React, { useState, useEffect } from "react";

import { Message as MessageSocket } from "shared/utils/socket";
import { Message as MessageApi } from "shared/utils/api";

const MESSAGE_LIMIT = 20;

function useRoomMessage(roomId, lastId){

    const [ messages, setMessages ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ hasMore, setHasMore ] = useState(true);
    const [ hasError, setHasError ] = useState(false);
    
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                const response = await MessageApi.getRoomMessage(roomId, lastId, MESSAGE_LIMIT);
                setHasMore(response.length > 0);
                setMessages( prevMessages => [
                    ...(response.reverse()),
                    ...prevMessages
                ]);

                setIsLoading(false);
            } catch (err) {
                setHasError(true)
            }
        })();
    }, [lastId]);

    useEffect(() => {

        MessageSocket.addRecieveMessageListener((data) => {
            const { content, userId } = data;

            setMessages( prevMessages => [
                {
                    id : '0',
                    sender : userId,
                    content : content,
                    time_created : (new Date(Date.now())).toISOString()
                },
                ...prevMessages
            ]);
        })

        return MessageSocket.removeRecieveMessageListener;
    }, []);


    return {
        //variables
        isLoading,
        hasMore,
        hasError,
        messages,

        //methods
        setMessages
    }
}

export default useRoomMessage;