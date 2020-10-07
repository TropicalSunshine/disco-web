import React, { PureComponent } from 'react'
import PropTypes from "prop-types";
import { TextField } from '@material-ui/core';
import { toast } from "react-toastify";

import { HistoryPropTypes, AuthPropTypes } from "shared/types";
import { InputSubmit } from "shared/components";


import commonStyles from "../styles.module.css";
import styles from "./Login.module.css";

class Login extends PureComponent {

    state = {
        email: "",
        password: "",
        isSubmitting: false,
        isError: false
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (e) => {

        e.preventDefault();
        e.stopPropagation();

        this.setState({
            isSubmitting: true
        });

        const { auth, user, redirect } = this.props;

        try {
            const { email, password } = this.state;

            await auth.login(email, password);
            await user.getUser();

            toast.success("Success");
            this.props.history.push(redirect);

        } catch (err) {
            toast.warning(err.message);
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
                    <form
                        className="box-center box-column"
                        autoComplete="on"
                        onSubmit={this.handleSubmit}>
                        <div className={commonStyles["input-container"]}>
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
                        <div className={commonStyles["input-container"]}>
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
    ...AuthPropTypes,
    redirect: PropTypes.string.isRequired
}


export default Login;
