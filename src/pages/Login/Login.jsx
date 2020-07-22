import React, { Component } from 'react'

import "./style.css";

import Button from '@material-ui/core/Button';
import { BoxCenter } from "shared/styles/common";

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
                    <BoxCenter>
                        <h1>Login</h1>
                    </BoxCenter>
                    <BoxCenter>
                        <Button variant="contained" color="primary">
                            Login with Spotify
                        </Button>
                    </BoxCenter>
                </div>
            </div>
        )
    }
}
