import React, { useState, useEffect } from "react";

import { 
    Login as LoginDialog, 
    Register as RegisterDialog 
} from "shared/components/dialog";

import { 
    UserProfileIcon
} from "shared/components";

import PopMenu from "./PopMenu";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import styles from "./styles.module.css";


function Navbar({ auth, history }){

    const [ showLogin, setShowLogin ] = useState(false);
    const [ showRegister, setShowRegister ] = useState(false);
    const [ showPopMenu, setShowPopMenu ] = useState(false);

    const redirectToHome = () => history.push("/");

    useEffect(() => {
        return () => {
            document.removeEventListener("mousedown", closePopMenu);
        }
    }, []);


    const closePopMenu = () => {
        setShowPopMenu(false);
        document.removeEventListener("mousedown", closePopMenu);
    }

    const openMenu = () => {
        if(showPopMenu) {
            closePopMenu();
            return;
        }

        setShowPopMenu(true);
        document.addEventListener("mousedown", closePopMenu);
        
    }

    const handleLogout = () => auth.logout();

    return(
        <React.Fragment>
            <LoginDialog 
            show={showLogin}
            handleClose={() => setShowLogin(false)}
            />
            <RegisterDialog
            show={showRegister}
            handleClose={()=> setShowRegister(false)}
            />
            <div className={`${styles.container}`}>
                <header className={`box-row ${styles["navbar"]}`}>
                    <div>
                        <h1 
                        onClick={redirectToHome}
                        className={styles.logo}>
                            <span className="light-blue">d</span>
                            <span className="purple">i</span>
                            <span className="pink">s</span>
                            <span className="yellow">c</span>
                            <span className="aqua">o</span>
                        </h1>
                    </div>
                    <div className={`box-row ${styles["navbar__item-container"]}`}>
                        {
                            ( !auth.isLoggedIn ) && (
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
                            ( auth.isLoggedIn ) && (
                                <React.Fragment>
                                    <div  
                                    className={styles["navbar__menu-item"]}>    
                                        <Link to="/explore">
                                            Explore
                                        </Link>
                                    </div>
                                    <div className={`${styles["navbar__user-icon-box"]}`}>
                                        <span 
                                        className={`${styles["navbar__user-icon"]}`}
                                        onMouseDown={openMenu}>
                                            <UserProfileIcon
                                            height={"40px"}
                                            />
                                        </span>
                                        {
                                            (showPopMenu) && <PopMenu
                                                options={[
                                                    {
                                                        label : "Logout",
                                                        onClick : handleLogout
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