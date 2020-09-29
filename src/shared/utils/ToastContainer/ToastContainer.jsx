import React from 'react'
import { ToastContainer as ToastBox } from "react-toastify";

import Modal from "shared/components/dialog";

function ToastContainer() {
    return (
        <Modal>
            <ToastBox
                position="top-center"
            />
        </Modal>
    )
}


export default ToastContainer;
