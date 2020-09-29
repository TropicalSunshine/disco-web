import React from "react";
import MusicRoomContext from "./MusicRoomContext";

const withMusicRoomProvider = Component => function(props){

    return (
        <MusicRoomContext.Consumer>
            {
                (musicRoom) => {
                    if(!musicRoom.isProviderInitialized) throw new Error("Provider not initialized");
                    
                    return <Component 
                    {...props}
                    musicRoom={musicRoom} />
                }
            }
        </MusicRoomContext.Consumer>
    )
}

export default withMusicRoomProvider;