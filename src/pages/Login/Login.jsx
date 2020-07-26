import React, { PureComponent } from 'react'

import { Button, TextField } from '@material-ui/core';

import { HistoryPropTypes } from "shared/types"; 

import styles from "./style.module.css";


class Login extends PureComponent {
    constructor(props){

        super(props);

        this.state = {
            
        }   
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;


    }



    render() {
        return (
            <div>
                <div className={styles["login-container"]}>
                    <div className="box-center">
                        <h1>Login</h1>
                    </div>
                    <form className="box-center">
                        <TextField
                        name="email"
                        type="email"
                        
                        />

                        <Button variant="contained" color="primary">
                            Login with Spotify
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    ...HistoryPropTypes
}


export default Login;
