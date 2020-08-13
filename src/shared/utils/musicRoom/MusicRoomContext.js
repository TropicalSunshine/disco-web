import React from "react";

const DEFAULT_ROOM = {
    pause: true,
    play: false,
    songImageUrl : null,
    isConnect : false,
    isProviderInitialized : false
}

const MusicRoomContext = React.createContext(DEFAULT_ROOM);

export default MusicRoomContext;