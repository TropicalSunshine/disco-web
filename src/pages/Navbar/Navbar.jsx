import React from "react";
import { PureComponent } from "react";

import { Button } from "@material-ui/core";

import styles from "./styles.module.css";

class Navbar extends PureComponent{


    render(){
        return(
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
                        <Button variant="contained" color="primary">
                            Sign In
                        </Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default Navbar;