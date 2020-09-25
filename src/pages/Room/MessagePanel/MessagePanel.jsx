import React, { 
    useState, 
    useLayoutEffect, 
    useRef, 
    useCallback, 
    Suspense,
    lazy
} from 'react';

import { useParams } from "react-router-dom";

import { MessageInput, Spinner } from "shared/components";
import PanelTabs from "../shared/PanelTabs";
import MessageBlock from "./MessageBlock";
import { DEFAULT_USER } from "../DEFAULTS";

import useRoomMessage from "./hooks/useRoomMessage";
import { useAuth } from "shared/utils/auth";
import { Message as MessageSocket } from "shared/utils/socket";


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
];

function MessagePanel({ members }) {
    const { roomId } = useParams();
    const { userId } = useAuth();

    
    const [ lastId, setLastId ] = useState(DEFAULT_ID);
    const [ tab, setTab ] = useState(0);

    const [ isScrollAtBottom, setIsScrollAtBottom ] = useState(true);

    const {
        isLoading,
        hasMore,
        messages,
        isScrollOldMessages,
        setMessages,
        setIsScrollOldMessages
    } = useRoomMessage(roomId, lastId);

    const messageContainer = useRef(null);
    const lastMessageObserver = useRef(null);
    const firstMessageObserver = useRef(null);

    const lastMessageElement = useCallback(element => {
        if(isLoading) return;

        if(lastMessageObserver.current) lastMessageObserver.current.disconnect();

        lastMessageObserver.current = new IntersectionObserver( entries => {

            if(entries[0].isIntersecting && hasMore){
                setLastId(messages[0]._id);
                setIsScrollOldMessages(true);
            }
        }, {
            threshold : 0.5
        })
        
        if(element) lastMessageObserver.current.observe(element);

    }, [ isLoading, hasMore, messages, setIsScrollOldMessages])


    //dont scroll down when user is not interesecting newest message
    const firstMessageElement = useCallback(element => {
        if(isLoading) return;
        if(firstMessageObserver.current) firstMessageObserver.current.disconnect();

        firstMessageObserver.current = new IntersectionObserver( entries => {
            if(entries[0].isIntersecting){
                setIsScrollAtBottom(true);
            } else {
                setIsScrollAtBottom(false);
            }

        }, {
            threshold : 0.3
        });

        if(element) firstMessageObserver.current.observe(element);
    }, [isLoading])

    const onMessageEnter = (content) => {
        
        
        setMessages( prevMessages => [
            ...prevMessages,
            {
                _id : DEFAULT_ID,
                sender : {
                    _id : userId
                },
                content : content,
                time_created : (new Date(Date.now())).toISOString()
            }
        ]);
        setIsScrollOldMessages(false);


        MessageSocket.sendMessage(content);
    }


    
    useLayoutEffect(() => {
        //set the scroll bar to bottom whenever the message.length changes
        var { current } = messageContainer;
        //only move scroll to bottom per new message
        // if user is viewing the latest message
        // otherwise scroll down a bit when user is viewing old messages
        
        if(!isScrollOldMessages && isScrollAtBottom){
            current.scrollTop = current.scrollHeight - current.clientHeight;
        } else {
            current.scrollTop = current.clientHeight - 30;
        }
        
    }, [messages.length, isScrollOldMessages, isScrollAtBottom]);

    const handleTabSelect = (i) => setTab(i);

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
                        var user = (members[m.sender._id] === undefined) ? 
                        {
                            ...DEFAULT_USER,
                            ...m.sender
                        } : members[m.sender._id];
                        
                        if(i === 0) return (
                            <MessageBlock
                            user={user}
                            key={`${i}-${m._id}`}
                            message={m}
                            ref={lastMessageElement}
                            />
                        )

                        if(i === (messages.length - 1)) return (
                            <MessageBlock
                            user={user}
                            key={`${i}-${m._id}`}
                            message={m}
                            ref={firstMessageElement}
                            />
                        )

                        return (
                            <MessageBlock
                            user={user}
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
                    (Object.keys(members).map( (key, i)=> (
                        <MemberBlock
                            key={`room-member-${key}-${i}`}
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
