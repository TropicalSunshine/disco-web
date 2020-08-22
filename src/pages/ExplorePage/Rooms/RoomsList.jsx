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
        hasMore,
        hasError
    } = useRoomsQuery(LIMIT, lastId);

    const { history } = props;

    const observer = useRef();
    const lastRoomElement = useCallback( element => {
        
        if(isLoading) return;
        
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                
                
                setLastId(rooms[rooms.length - 1].id);
            }
        })

        if(element) observer.current.observe(element);

    }, [isLoading, hasMore])
    
    return (
        <div className={`${styles["rooms-container"]}`}>
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
            {
                (isLoading) && 
                <div className={`${styles["spinner-container"]}`}>
                    <Spinner/>
                </div>
            }
        </div>
    )
}

export default RoomsList;