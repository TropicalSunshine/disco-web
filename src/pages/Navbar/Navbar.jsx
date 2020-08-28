import React, { PureComponent } from "react";

import { 
    Login as LoginDialog, 
    Register as RegisterDialog 
} from "shared/components/dialog";

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
                    <header className={`box-row ${styles["navbar-container"]}`}>
                        <div>
                            <h1 
                            onClick={this.redirectToHome}
                            className={styles.logo}>
                                <span>d</span>
                                <span className="purple">i</span>
                                <span className="pink">s</span>
                                <span className="yellow">c</span>
                                <span className="aqua">o</span>
                            </h1>
                        </div>
                        <div className={styles["button-container"]}>
                            {
                                ( !auth.isLoggedIn ) && (
                                    <React.Fragment>
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
                                    </React.Fragment>
                                )
                            }
                            {
                                ( auth.isLoggedIn ) && (
                                    <React.Fragment>
                                        <Link to="explore">
                                            Explore
                                        </Link>
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