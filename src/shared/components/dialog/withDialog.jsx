import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const withDialog = Component => class extends PureComponent {

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
                        <div 
                        className={styles["dialogue-container"]}>
                            <div className={styles["dialogue-box"]}>
                                <Component {...this.props}/>
                            </div>
                        </div>
                    )
                }
            </React.Fragment>
        )
    }
}

export default withDialog;
