import React, { Component } from 'react'
import { Helmet } from "react-helmet";

import {
    Radio,
    RadioGroup, FormControlLabel,
} from "@material-ui/core";
import { AssignmentIndRounded } from "@material-ui/icons";
import { InputSubmit, TextInput, TextInputArea } from "shared/components";

import styles from "./styles.module.css";
import { textStyles } from "shared/styles";

import { Room as RoomApi } from "shared/utils/api";


class CreateRoomPage extends Component {

    state = {
        name: "",
        isPrivate: false,
        description: "",
        isSubmitting: false,
        errorMsg: ""
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            isSubmitting: true
        });

        try {
            const { auth, history } = this.props;

            const { name, description, isPrivate } = this.state;

            var response = await RoomApi.createRoom({
                name: name,
                isPrivate: isPrivate,
                description: description,
                creator: auth.userId
            });

            if (response.error === null) {
                throw new Error(response.error);
            }


            const roomId = response.data.data.createRoom.roomId;

            if (!roomId) {
                throw new Error("invalid room id");
            }

            history.push(`/r/${roomId}`);


        } catch (err) {
            this.setState({
                errorMsg: err.message
            });
        }

        this.setState({
            isSubmitting: false
        });



    }

    handleInputChange = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleRadioChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { value } = e.target;

        if (value === "private") this.setState({ isPrivate: true });
        if (value === "public") this.setState({ isPrivate: false });
    }

    render() {

        const { isSubmitting } = this.state;

        return (
            <div className={`${styles["create-room-container"]} box-center box-column`}>
                <Helmet>
                    <title>Create a Room</title>
                </Helmet>
                <div>
                    <h1 className={`${textStyles["text-main"]}`}>Create a Room</h1>
                </div>
                <div>
                    {
                        (this.state.errorMsg !== "") && (
                            <h3 className={`${textStyles["text-4"]} red`}>
                                {
                                    this.state.errorMsg
                                }
                            </h3>
                        )
                    }
                </div>
                <form className={`${styles["form-container"]} box-center box-column`}
                    onSubmit={this.handleSubmit}
                >
                    <div className={`${styles["input-container"]}`}>
                        <TextInput
                            dark={false}
                            onChange={this.handleInputChange}
                            Icon={AssignmentIndRounded}
                            label={"Name"}
                            name="name"
                            id={"create-room-name"}
                        />
                    </div>
                    <div className={`${styles["input-container"]}`}>
                        <TextInputArea
                            dark={false}
                            label="Description"
                            rows={3}
                            id={"create-room-description-input"}
                            name="description"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className={`${styles["input-container"]} box-center`}>
                        <RadioGroup
                            row={true}
                            required={true}
                            defaultValue={"private"}
                            onChange={this.handleRadioChange}>
                            <FormControlLabel
                                value="private"
                                control={
                                    <Radio
                                        disabled={isSubmitting}
                                        color="secondary" />
                                }
                                label="Private"
                            />
                            <FormControlLabel
                                value="public"
                                control={
                                    <Radio
                                        disabled={isSubmitting}
                                        color="secondary" />
                                }
                                label="Public"
                            />
                        </RadioGroup>
                    </div>
                    <div className={`${styles["submit-container"]}`}>
                        <InputSubmit
                            disabled={this.state.isSubmitting}
                            value="Create"
                            loading={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        )
    }
}


export default CreateRoomPage;
