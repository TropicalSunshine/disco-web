import React, { 
    useState, 
    useEffect, 
    useRef, 
    useCallback, 
    Suspense,
    lazy
} from 'react';

import { useParams } from "react-router-dom";

import { MessageInput, Spinner } from "shared/components";

import { useAuth } from "shared/utils/auth";
import { Message as MessageSocket } from "shared/utils/socket";

import useRoomMessage from "./hooks/useRoomMessage";
import PanelTabs from "../shared/PanelTabs";
import MessageBlock from "./MessageBlock";

import styles from "./styles.module.css";

const MemberBlock = lazy(() => import("./MemberBlock"));

const DEFAULT_ID = '0';
const TAB_OPTIONS = [
    {
        name : "Chat"
    },
    {
        name : "Members"
    }
]

function MessagePanel({ members }) {
    const { roomId } = useParams();
    const { userId } = useAuth();

    const [ lastId, setLastId ] = useState(DEFAULT_ID);
    const [ tab, setTab ] = useState(0);

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
                sender : userId,
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

    const handleTabSelect = (i) => {
        setTab(i);
    }

    return (
        <div className={`${styles["message-panel"]} box-column`}>
            <div className={`${styles["message-panel__tabs"]}`}>
                <PanelTabs 
                onChange={handleTabSelect} 
                options={TAB_OPTIONS}/>
            </div>
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
                    (tab === 0) && 
                    (messages.map( (m, i) => {
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
                    }))
                }
            
                <Suspense
                fallback={<Spinner/>}
                >
                {
                    (tab === 1) &&
                    (Object.keys(members).map( key => (
                        <MemberBlock
                            user={members[key]}
                        />
                    )))
                }
                </Suspense>

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
