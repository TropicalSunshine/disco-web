import React, { useState } from 'react';
import PropTypes from "prop-types";
import { LoginWithoutDialog } from "shared/components/dialog/Login";
import { RegisterWithoutDialog } from "shared/components/dialog/Register";

import styles from "./AuthPage.module.css";

function AuthPage({ redirect }) {

    const [isSignUp, setIsSignUp] = useState(false);

    const toggle = () => setIsSignUp(!isSignUp);

    return (
        <div className={`box-center ${styles.authPage}`}>
            <div className={`${styles.authPageDialogBox}`}>
                <div className={`${styles.authPageDialogBoxContent}`}>
                    {
                        (!isSignUp) && <LoginWithoutDialog redirect={redirect} />
                    }
                    {
                        (isSignUp) && <RegisterWithoutDialog redirect={redirect} />
                    }
                </div>
                <div className={`${styles.authPageMessage}`}>
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
