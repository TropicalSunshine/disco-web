import React from 'react';
import { useLocation } from "react-router-dom";

import AuthPage from "pages/AuthPage";

import useAuth from "./useAuth";

const withAuthPage = Component => function () {

    const { isLoggedIn } = useAuth();
    const location = useLocation();

    console.log(location);
    if (isLoggedIn) return <Component />;

    return <AuthPage redirect={location} />

}

export default withAuthPage;
