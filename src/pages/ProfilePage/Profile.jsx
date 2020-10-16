import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Spinner, UserProfileIcon } from "shared/components";

import { useUser } from "shared/context/user";
import { User as UserApi } from "shared/utils/api";

import { textStyles } from "shared/styles";
import styles from "./Profile.module.css";


function Profile() {

    const { user } = useUser();
    const { username } = useParams();

    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadProfile = async () => {
        const response = await UserApi.getUserByUsername(username);
        setUserProfile(response.data.data.getUserByUsername);
        setIsLoading(false);
    }

    /* eslint-disable */
    useEffect(() => {
        if (!user) return;
        if (username === user.username) {
            setUserProfile(user);
            setIsLoading(false);
        } else {
            loadProfile();
        }

    }, [user]);
    /* eslint-enable */

    return (
        <div className={`box-center ${styles["profile"]}`}>
            { (isLoading) && <Spinner />}
            {
                (!isLoading) && (
                    <div className="box-column">
                        <Helmet>
                            <title>@{userProfile.username}</title>
                        </Helmet>
                        <div>
                            <UserProfileIcon
                                height="200px"
                                label={userProfile.username}
                            />
                        </div>
                        <div>
                            <h1 className={`
                                ${styles["profile__text__username"]}
                                ${textStyles["text-main"]}
                            `}>
                                {userProfile.username}
                            </h1>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Profile;
