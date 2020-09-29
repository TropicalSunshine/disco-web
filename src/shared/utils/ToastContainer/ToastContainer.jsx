import React from 'react'
import { ToastContainer as ToastBox } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"

import { Modal } from "shared/components/dialog";
import "./ToastContainer.css";
import { textStyles } from "shared/styles";

function ToastContainer() {
    return (
        <Modal>
            <ToastBox
                className={textStyles["text-3"]}
                autoClose={2000}
                hideProgressBar
                pauseOnHover={true}
                position="top-center"
            />
        </Modal>
    )
}


export default ToastContainer;
