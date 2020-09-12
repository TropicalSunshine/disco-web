const constants = Object.freeze({
    USERJOINROOM: 1,
    USERCHANGESONG: 2,
    USERINPUT: 3,
    controls: {
        PLAY: 4,
        PAUSE: 5,
        SEEK:  6
    },
    JOINSUCCESS: 7,
    UPDATE: 8,
    USERLEAVEROOM : 9,
    SEND_MESSAGE : 10,
    RECIEVE_MESSAGE : 11,
    ERROR : 12,
    DJ : {
        REQUEST: 13,
        RESPOND : 14,
        STEP_DOWN : 15,
        STEP_UP : 16
    }
});


export default constants;