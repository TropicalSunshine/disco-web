import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import "./Login.css";

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }



    render() {
        return (
            <div>
                <div className="login-container">
                    <div className="box-center">
                        <h1>Login</h1>
                    </div>
                    <div className="box-center">
                        <Button variant="contained" color="primary">
                            Login with Spotify
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
