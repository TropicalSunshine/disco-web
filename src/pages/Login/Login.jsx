import React, { PureComponent } from 'react'

import { TextField, CircularProgress} from '@material-ui/core';

import { HistoryPropTypes } from "shared/types"; 

import { InputSubmit } from "shared/components";

import styles from "./style.module.css";



class Login extends PureComponent {
    constructor(props){

        super(props);
        this.state = {
            email: "",
            password : "",
            isSubmitting: false,
            isError : false,
            errorMessage : "error"
        }   
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name] : value
        });
    }

    handleSubmit = async (e) => {
        
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            isSubmitting: true
        })

        const { auth } = this.props;
        console.log(this.props);
        try{
            const { email, password } = this.state;
            var result = await auth.login(email, password);    


        } catch(err) {

            console.log(err.message);
            this.setState({

            })
        }

        this.setState({
            isSubmitting: false
        });
    }



    render() {
        console.log(styles);
        return (
            <div className={styles["login-container"]}>
               {
                    (this.state.isError) && 
                    (
                        <div className={`${styles["error-container"]} ${styles["error-container-active"]}`}>
                            <p>{this.state.errorMessage}</p>
                        </div>
                    )
               }
               {
                   (!this.state.isError) && (
                    <div className={`${styles["error-container"]}`}>
                        <p></p>
                    </div>
                   )
               }
                  
                <div className={styles["login-box"]}>
                    <div className="box-center">
                        <h1>Login</h1>
                    </div>
                    <form className="box-center box-column" autoComplete="on" onSubmit={this.handleSubmit}
                     >    
                        <div className={styles["input-container"]}>
                            <TextField
                            disabled={this.state.isSubmitting}
                            variant="outlined"
                            label="Email"
                            
                            fullWidth={true}
                            name="email"
                            type="email"
                            required={true}
                            />
                        </div>
                        <div className={styles["input-container"]}>
                            <TextField
                            disabled={this.state.isSubmitting}
                            variant="outlined"
                            label="Password"
                            
                            fullWidth={true}
                            name="password"
                            type="password"
                            required={true}
                            />
                        </div>                        
                        <div className={styles["button-container"]}>
                            
                            <InputSubmit
                            disabled={this.state.isSubmitting}
                            loading={this.state.isSubmitting}
                            type="submit"
                            value="Login"
                            />
                        </div>
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
