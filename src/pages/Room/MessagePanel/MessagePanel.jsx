import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";

import { TextArea, Spinner } from "shared/components";

import { User as UserStorage } from "shared/utils/storage"; 
import { Message as MessageSocket } from "shared/utils/socket";

import useRoomMessage from "../hooks/useRoomMessage";
import MessageBlock from "./MessageBlock";
import styles from "./styles.module.css";
import { Message } from '@material-ui/icons';

const DEFAULT_ID = '0';

function MessagePanel() {

    const { roomId } = useParams();

    const [ lastId, setLastId ] = useState(DEFAULT_ID);

    const {
        isLoading,
        hasMore,
        hasError,
        messages,

        setMessages
    } = useRoomMessage(roomId, lastId);

    const messageContainer = useRef(null);

    const onMessageEnter = (content) => {
        console.log(messageContainer);
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight - messageContainer.current.clientHeight;
        
        setMessages( prevMessages => [
            ...prevMessages,
            {
                id : '0',
                sender : UserStorage.userId.get(),
                content : content,
                time_created : (new Date(Date.now())).toISOString()
            }
        ])
        
        MessageSocket.sendMessage(content);
    }

    useEffect(() => {
        //set the scroll bar to bottom whenever the message.length changes
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight - messageContainer.current.clientHeight;
    }, [messages.length])

    return (
        <div className={`${styles["message-panel"]} box-column`}>
            <ul 
                className={`${styles["message-panel__messages"]} box-column`}
                ref={messageContainer}
            >
                {
                    (isLoading) && (
                        <Spinner/>
                    )
                }
                {
                    messages.map( (m, i) => {
                        return (
                            <MessageBlock
                            key={`${i}-${m.id}`}
                            message={m}
                            />
                        )
                    })
                }
            </ul>
            <div className={`${styles["message-panel__input"]}`}>
                <TextArea
                onEnter={onMessageEnter}
                />
            </div>
        </div>
    )
}

export default MessagePanel;
