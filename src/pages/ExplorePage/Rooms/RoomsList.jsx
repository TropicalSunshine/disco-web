import React, { useState, useRef, useCallback } from "react";

import RoomBox from "./RoomBox";
import useRoomsQuery from "../hooks/useRoomsQuery";

import { Spinner } from "shared/components";
import styles from "./styles.module.css";

const LIMIT = 10;

function RoomsList(props){

    const [lastId, setLastId] = useState('0');

    const { 
        rooms,
        isLoading,
        hasMore
    } = useRoomsQuery(LIMIT, lastId);

    const { history } = props;

    const observer = useRef();
    const lastRoomElement = useCallback( element => {
        
        if(isLoading) return;
        
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setLastId(rooms[rooms.length - 1]._id);
            }
        })

        if(element) observer.current.observe(element);

    }, [isLoading, hasMore, rooms])
    
    return (
        <>
            <div className={`${styles["rooms-list"]}`}>
                {
                    rooms.map((r, i) => {
                        var key = `room-${i}`;

                        if(i === (rooms.length - 1)){
                            return <RoomBox 
                            history={history}
                            key={key}
                            ref={lastRoomElement} 
                            room={r} />
                        }
                        
                        return <RoomBox 
                                history={history}
                                key={key}
                                room={r} />
                    })
                }
            </div>
            {
                (isLoading) && 
                <div className={`${styles["spinner-container"]} box-center`}>
                    <Spinner/>
                </div>
            }
        </>
    )
}

export default RoomsList;