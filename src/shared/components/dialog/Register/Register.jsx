import React from "react";
import { PureComponent } from "react";

import { InputSubmit } from "shared/components";
import { TextField } from '@material-ui/core';
import { HistoryPropTypes, AuthPropTypes } from "shared/types"; 

import styles from "./styles.module.css";

class Register extends PureComponent {

    state = {
        username : "", //need to check for username available later on
        password : "",
        passwordConfirm: "",
        email : "",
        errorMessage : "",
        isSubmitting: false
    }

    
    handleInputChange = (e) => {
        var { name, value } = e.target;
        
        this.setState({
            [name] : value
        });
    }

    handleSubmit = async (e) => {

        this.setState({
            isSubmitting: true
        });

        e.preventDefault();
        e.stopPropagation();

        const { auth } = this.props;
        console.log(auth);

        try{
            var { password, passwordConfirm, email, username } = this.state;

            if(password !== passwordConfirm){
                throw new Error("Passwords do not match");
            }

            var response = await auth.register(email, password, username);
            console.log(response);
            this.props.handleClose();

        } catch(err) {
            this.setState({
                errorMessage: err.message
            });
        }

        this.setState({
            isSubmitting: false
        });
    }

    render(){
        return(
            <React.Fragment>
                <div className="box-center">
                    <h1>Register</h1>
                </div>
                <div className="box-center">
                    {
                        (this.state.errorMessage !== "") && (
                        <h3 className="red">{this.state.errorMessage}</h3>
                        )
                    }
                </div>
                <form
                className="box-center box-column"
                onSubmit={this.handleSubmit}
                >
                    <div className={`${styles["input-container"]}`}>
                        <TextField
                        onChange={this.handleInputChange}
                        disabled={this.state.isSubmitting}
                        variant="outlined"
                        label="Username"
                        fullWidth={true}
                        name="username"
                        type="text"
                        required={true}
                        />
                    </div>
                    <div className={`${styles["input-container"]}`}>
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
                    <div className={`${styles["input-container"]}`}>
                        <TextField
                        onChange={this.handleInputChange}
                        disabled={this.state.isSubmitting}
                        variant="outlined"
                        label="Password"
                        fullWidth={true}
                        name="password"
                        type="text"
                        required={true}
                        />
                    </div>
                    <div className={`${styles["input-container"]}`}>
                        <TextField
                        onChange={this.handleInputChange}
                        disabled={this.state.isSubmitting}
                        variant="outlined"
                        label="Confirm Password"
                        fullWidth={true}
                        name="passwordConfirm"
                        type="text"
                        required={true}
                        />
                    </div>
                    <div className={styles["button-container"]}>
                        <InputSubmit
                        disabled={this.state.isSubmitting}
                        loading={this.state.isSubmitting}
                        value="Sign Up"
                        />
                    </div>

                </form>
            </React.Fragment>
        )
    }
}

Register.propTypes = {
    ...HistoryPropTypes,
    ...AuthPropTypes
};


export default Register;