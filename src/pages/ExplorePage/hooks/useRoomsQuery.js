import { useEffect, useState } from "react";
import { Room } from "shared/utils/Api";

function useRoomsQuery(limit, lastId){
    const [ rooms, setRooms ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ hasMore, setHasMore ] = useState(true);
    const [ hasError, setHasError ] = useState(); 

    useEffect( () => {
        (async () => {
            setIsLoading(true);

            
            try {  
                const response = await Room.Rooms(limit, lastId);

                setHasMore(response.length > 0);

                

                setRooms(prevRooms => [
                    ...prevRooms,
                    ...response
                ]);

                

                setIsLoading(false);

            } catch (err) {
                setHasError(true);
            }
        })();
        
    }, [lastId, limit])

    return {
        rooms,
        isLoading,
        hasMore,
        hasError
    }
}

export default useRoomsQuery;