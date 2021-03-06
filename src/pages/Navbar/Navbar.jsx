import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";

import {
    Login as LoginDialog,
    Register as RegisterDialog
} from "shared/components/dialog";

import { UserProfileIcon, Logo } from "shared/components";
import { useUser } from "shared/context/user";

import PopMenu from "./PopMenu";
import styles from "./styles.module.css";


function Navbar({ auth, history }) {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showPopMenu, setShowPopMenu] = useState(false);

    const { user } = useUser();

    const redirectToHome = () => history.push("/");

    /* eslint-disable */
    useEffect(() => {
        return () => {
            document.removeEventListener("mousedown", closePopMenu);
        }
    }, []);
    /* eslint-enable */


    const closePopMenu = () => {
        setShowPopMenu(false);
        document.removeEventListener("mousedown", closePopMenu);
    }

    const openMenu = () => {
        if (showPopMenu) {
            closePopMenu();
            return;
        }

        setShowPopMenu(true);
        document.addEventListener("mousedown", closePopMenu);

    }

    const handleLogout = () => {
        try {
            auth.logout();
            toast.success("Success");
            history.push("/");
        } catch (err) {
            toast.warning(err.message);
        }
    }

    return (
        <React.Fragment>
            <LoginDialog
                redirect={"/explore"}
                show={showLogin}
                handleClose={() => setShowLogin(false)}
            />
            <RegisterDialog
                redirect={"/explore"}
                show={showRegister}
                handleClose={() => setShowRegister(false)}
            />
            <div className={`${styles.container}`}>
                <header className={`box-row ${styles["navbar"]}`}>
                    <div
                    onClick={redirectToHome}
                    className={styles.logo}
                    >
                        <Logo/>
                    </div>
                    <div className={`box-row ${styles["navbar__item-container"]}`}>
                        {
                            (!auth.isLoggedIn) && (
                                <React.Fragment>
                                    <div className={styles["navbar__item"]}>
                                        <Button
                                            variant="contained"
                                            onClick={() => setShowRegister(true)}
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                    <div className={styles["navbar__item"]}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setShowLogin(true)}
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )
                        }
                        {
                            (auth.isLoggedIn) && (
                                <React.Fragment>
                                    <div
                                        className={styles["navbar__menu-item"]}>
                                        <Link to="/explore">
                                            Explore
                                        </Link>
                                    </div>
                                    <div
                                        className={styles["navbar__menu-item"]}>
                                        <Link to={`/u/${(user.username) ? (user.username) : ""}`}>
                                            {"Profile"}
                                        </Link>
                                    </div>
                                    <div className={`${styles["navbar__user-icon-box"]}`}>
                                        <span
                                            className={`${styles["navbar__user-icon"]}`}
                                            onMouseDown={openMenu}>
                                            <UserProfileIcon
                                                label={(user.username) ? (user.username) : ""}
                                                height={"40px"}
                                            />
                                        </span>
                                        {
                                            (showPopMenu) && <PopMenu
                                                options={[
                                                    {
                                                        label: "Logout",
                                                        onClick: handleLogout
                                                    }
                                                ]}
                                            />
                                        }
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </div>
                </header>
            </div>
        </React.Fragment>
    )

}

export default Navbar;