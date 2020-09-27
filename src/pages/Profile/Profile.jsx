import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

/* eslint-disable */
const CURRENT_USER_SLUG = "@me";

function Profile(props) {

    const { username } = useParams();

    useEffect(() => {

    }, []);

    return (
        <div>

        </div>
    )
}
/* eslint-enable */

export default Profile;
