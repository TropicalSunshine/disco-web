import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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

export default Profile;
