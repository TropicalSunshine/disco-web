import React, { PureComponent } from 'react'

import { TextField } from '@material-ui/core';

import { HistoryPropTypes, AuthPropTypes } from "shared/types"; 

import { InputSubmit } from "shared/components";

import styles from "./styles.module.css";



class Login extends PureComponent {

    state = {
        email: "",
        password : "",
        isSubmitting: false,
        isError : false,
        errorMessage : ""
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
        
        try{
            const { email, password } = this.state;
            console.log(email, password);
            var result = await auth.login(email, password);    


        } catch(err) {

            console.log(err.message);
            this.setState({
                errorMessage: err.message
            });
        }

        this.setState({
            isSubmitting: false
        });
    }



    render() {
        
        return (
            <React.Fragment>
                <div>
                    <div className="box-center">
                        <h1>Login</h1>
                    </div>
                    <div className="box-center">
                        {
                            (this.state.errorMessage !== "") && (
                            <h4 className="red">{this.state.errorMessage}</h4>
                            )
                        }
                    </div>
                    <form 
                    className="box-center box-column" 
                    autoComplete="on" 
                    onSubmit={this.handleSubmit}>    
                        <div className={styles["input-container"]}>
                            <TextField
                            onChange={this.handleInputChange}
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
                            onChange={this.handleInputChange}
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
                            value="Login"
                            />
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}



Login.propTypes = {
    ...HistoryPropTypes,
    ...AuthPropTypes
}


export default Login;
