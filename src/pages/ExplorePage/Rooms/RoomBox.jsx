import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import styles from "./styles.module.css";

const RoomBox = forwardRef((props, ref) => {
    const { room, history } = props;

    return (
        <div ref={ref} className={`${styles["room-box"]}`}
        onClick={() => {
            history.push(`/room/${room.id}`)
        }}
        >
            <h1>{room.name}</h1>
            <p>{room.description}</p>
            <p>{`Listeners : ${room.num_listeners}`}</p>
        </div>
    )
})


RoomBox.propTypes = {
    room : PropTypes.object.isRequired
}

export default withRouter(RoomBox);