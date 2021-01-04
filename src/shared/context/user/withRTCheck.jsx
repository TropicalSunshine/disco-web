import React from "react";
import { useEffect } from "react";
import useUser from "./useUser";

/*
 HOC
 when component renders checks if existing token has expired
 */
const withRTCheck = Component => function(props) {
    
    const user = useUser();

    /* eslint-disable */
    useEffect(() => {
        user.checkToken();
    });
    /* eslint-enable */

    return <Component {...props} />
}

export default withRTCheck;
