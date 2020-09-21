import React, { PureComponent } from "react";

import { 
    Login as LoginDialog, 
    Register as RegisterDialog 
} from "shared/components/dialog";

import { 
    UserProfileIcon
} from "shared/components";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import styles from "./styles.module.css";

class Navbar extends PureComponent{

    state = { 
        showLoginDialog: false,
        showRegisterDialog: false
    }

    redirectToHome = () => {
        const { history } = this.props;

        history.push("/");
    }

    render(){
        var { auth } = this.props;


        return(
            <React.Fragment>
                <LoginDialog 
                show={this.state.showLoginDialog}
                handleClose={() => {
                    this.setState({
                        showLoginDialog: false
                    })
                }}
                />
                <RegisterDialog
                show={this.state.showRegisterDialog}
                handleClose={()=> {
                    this.setState({
                        showRegisterDialog: false
                    })
                }}
                />
                <div className={`${styles.container}`}>
                    <header className={`box-row ${styles["navbar"]}`}>
                        <div>
                            <h1 
                            onClick={this.redirectToHome}
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
                                            onClick={() => {
                                                this.setState({
                                                    showRegisterDialog: true
                                                })
                                            }}
                                            >
                                                Sign Up
                                            </Button>
                                        </div>
                                        <div className={styles["navbar__item"]}>
                                            <Button 
                                            variant="contained" 
                                            color="primary"
                                            onClick={() => {
                                                this.setState({
                                                    showLoginDialog: true
                                                })
                                            }}
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
                                        <div>
                                            <UserProfileIcon
                                            height={"40px"}
                                            />
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
}

export default Navbar;