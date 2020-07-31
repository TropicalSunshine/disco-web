import React from "react";
import { PureComponent } from "react";

import { Login as LoginDialog } from "shared/components/dialog";

import { Button } from "@material-ui/core";


import styles from "./styles.module.css";

class Navbar extends PureComponent{

    constructor(props){
        super(props);

        this.state = { 
            showLoginDialog: true
        }
    }

    render(){
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
                <div className={`${styles.container}`}>
                    <header className={`box-row ${styles["navbar-container"]}`}>
                        <div>
                            <h1 className={styles.logo}>
                                <span>d</span>
                                <span className="purple">i</span>
                                <span className="pink">s</span>
                                <span className="yellow">c</span>
                                <span className="aqua">o</span>
                            </h1>
                        </div>
                        <div className={styles["button-container"]}>
                            <Button variant="contained">
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
                        </div>
                    </header>
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar;