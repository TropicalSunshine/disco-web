import React, { useState } from 'react';
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { Logo } from "shared/components";
import { LoginWithoutDialog } from "shared/components/dialog/Login";
import { RegisterWithoutDialog } from "shared/components/dialog/Register";

import styles from "./AuthPage.module.css";

function AuthPage({ redirect }) {

    const [isSignUp, setIsSignUp] = useState(false);

    const history = useHistory();
    const toggle = () => setIsSignUp(!isSignUp);

    const redirectToHome = () => history.push("/");

    return (
        <div className={`box-center ${styles["auth-page"]}`}>
            <div className={`${styles["auth-page__dialog-box"]}`}>
                <div
                onClick={redirectToHome} 
                className={`box-center ${styles["auth-page__logo"]}`}>
                    <Logo/>
                </div>
                <div className={`${styles["auth-page__dialog-box-content"]}`}>
                    {
                        (!isSignUp) && <LoginWithoutDialog redirect={redirect} />
                    }
                    {
                        (isSignUp) && <RegisterWithoutDialog redirect={redirect} />
                    }
                </div>
                <div className={`${styles["auth-page__message"]}`}>
                    <p>
                        {
                            (!isSignUp) && ("Need an account?")
                        }

                        <span
                            onClick={toggle}
                        >
                            {
                                (!isSignUp) && ("Sign Up")
                            }
                            {
                                (isSignUp) && ("Already have an account")
                            }
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

AuthPage.propTypes = {
    redirect: PropTypes.string
};

AuthPage.defaultProps = {
    redirect: "/explore"
};


export default AuthPage;
