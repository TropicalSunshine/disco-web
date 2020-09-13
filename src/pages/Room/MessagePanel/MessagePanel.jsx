import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from "react-router-dom";

import { MessageInput, Spinner } from "shared/components";

import { User as UserStorage } from "shared/utils/storage"; 
import { Message as MessageSocket } from "shared/utils/socket";

import useRoomMessage from "./hooks/useRoomMessage";
import MessageBlock from "./MessageBlock";
import styles from "./styles.module.css";

const DEFAULT_ID = '0';

function MessagePanel() {
    const { roomId } = useParams();

    const [ lastId, setLastId ] = useState(DEFAULT_ID);

    const {
        isLoading,
        hasMore,
        messages,
        setMessages
    } = useRoomMessage(roomId, lastId);

    const messageContainer = useRef(null);
    const lastMessageObserver = useRef(null);

    const lastRoomElement = useCallback(element => {
        if(isLoading) return;

        if(lastMessageObserver.current) lastMessageObserver.current.disconnect();

        lastMessageObserver.current = new IntersectionObserver( entries => {

            if(entries[0].isIntersecting && hasMore){
                setLastId(messages[0]._id);
            }
        }, {
            threshold : 0.5
        })
        
        if(element) lastMessageObserver.current.observe(element);

    }, [ isLoading, hasMore, messages])

    const onMessageEnter = (content) => {
        
        
        setMessages( prevMessages => [
            ...prevMessages,
            {
                _id : DEFAULT_ID,
                sender : UserStorage.userId.get(),
                content : content,
                time_created : (new Date(Date.now())).toISOString()
            }
        ])

        MessageSocket.sendMessage(content);
    }

    useEffect(() => {
        //set the scroll bar to bottom whenever the message.length changes
        var { current } = messageContainer;
        current.scrollTop = current.scrollHeight - current.clientHeight;
        
    }, [messages.length]);

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
                        if(i === 0) return (
                            <MessageBlock
                            key={`${i}-${m._id}`}
                            message={m}
                            ref={lastRoomElement}
                            />
                        )

                        return (
                            <MessageBlock
                            key={`${i}-${m._id}`}
                            message={m}
                            />
                        )
                    })
                }
            </ul>
            <div className={`${styles["message-panel__input"]}`}>
                <div className={`${styles["message-panel__input__line"]}`}>
                    <i/>
                </div>
                <MessageInput
                placeholder={"Send Message"}
                onEnter={onMessageEnter}
                />
            </div>
        </div>
    )
}

export default MessagePanel;
