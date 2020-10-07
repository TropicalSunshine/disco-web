import React, { useState } from 'react';
import PropTypes from "prop-types";
import { LoginWithoutDialog } from "shared/components/dialog/Login";
import { RegisterWithoutDialog } from "shared/components/dialog/Register";

import styles from "./AuthPage.module.css";

function AuthPage({ redirect }) {

    const [isSignUp, setIsSignUp] = useState(false);

    const toggle = () => setIsSignUp(!isSignUp);

    return (
        <div className={`box-center ${styles["auth-page"]}`}>
            <div className={`${styles["auth-page__dialog-box"]}`}>
                <div className={`${styles["auth-page__dialog-box__content"]}`}>
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
