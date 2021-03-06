import { useState, useEffect } from "react";

import { Message as MessageSocket } from "shared/utils/socket";
import { Message as MessageApi } from "shared/utils/api";

const MESSAGE_LIMIT = 20;

function useRoomMessage(roomId, lastId) {

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isScrollOldMessages, setIsScrollOldMessages] = useState(false);

    //keeps track of the intial load of messages in a room
    //used to check initial renders that are dependent on the intially
    //loaded messages in a room
    const [initialLoad, setInitialLoad] = useState(false);

    /* eslint-disable */
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                const response = await MessageApi.getRoomMessage(roomId, lastId, MESSAGE_LIMIT);
                setHasMore(response.length > 0);
                setMessages(prevMessages => [
                    ...(response.reverse()),
                    ...prevMessages
                ]);
                if (!initialLoad) setInitialLoad(true);
                setIsLoading(false);
            } catch (err) {
                setHasError(true)
            }
        })();
    }, [lastId]);
    /* eslint-enable */

    useEffect(() => {

        MessageSocket.addRecieveMessageListener((data) => {
            const { content, sender } = data;


            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: '0',
                    sender: {
                        _id: sender
                    },
                    content: content,
                    time_created: (new Date(Date.now())).toISOString()
                }
            ]);

            setIsScrollOldMessages(false);

        })

        return MessageSocket.removeRecieveMessageListener;
    }, []);


    return {
        //variables
        isLoading,
        isScrollOldMessages,
        hasMore,
        hasError,
        messages,
        initialLoad,

        //methods
        setMessages,
        setIsScrollOldMessages
    }
}

export default useRoomMessage;