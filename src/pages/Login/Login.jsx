import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button';

import styles from "./style.css";


class Login extends PureComponent {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            
        }   
    }



    render() {
        return (
            <div>
                <div className={styles["login-container"]}>
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

export default Login;
