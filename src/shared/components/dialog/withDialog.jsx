import React, { Component } from "react";
import PropTypes from "prop-types";

import { IconButton } from "shared/components";
import { ClearOutlined } from "@material-ui/icons";
import Modal from "./Modal";

import styles from "./styles.module.css";


const withDialog = Component => class extends Component {

    static propTypes = {
        show: PropTypes.bool.isRequired,
        handleClose : PropTypes.func.isRequired
    }

    componentDidMount(){
        document.addEventListener("keyup", this.handleEscape);
    }

    handleEscape = (e) => {
        if(e.key === "Escape"){
            this.props.handleClose();
        }
    }

    componentWillUnmount(){
        document.removeEventListener("keyup", this.handleEscape);
    }

    render(){
        return (
            <React.Fragment>
                {
                    this.props.show && (
                        <Modal>
                            <div 
                            className={`${styles["dialogue-container"]}`}>
                                <div className={`${styles["dialogue-box"]}`}>
                                    <IconButton
                                    onClick={() => {
                                        this.props.handleClose();
                                    }}
                                    >
                                        <ClearOutlined/>
                                    </IconButton>
                                    <Component {...this.props}/>
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </React.Fragment>
        )
    }
}

export default withDialog;
