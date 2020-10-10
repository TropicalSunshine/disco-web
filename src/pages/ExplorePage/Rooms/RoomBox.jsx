import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { colors } from "shared/styles";

import styles from "./styles.module.css";

const RoomBox = forwardRef((props, ref) => {
    const { room, history } = props;

    return (
        <div 
        ref={ref} 
        className={`${styles["room-box"]}`}
        onClick={() => history.push(`/r/${room._id}`)
        }
        style={{
            backgroundColor: colors.randomColorFromString(room.name)
        }}
        >
            <div className={styles["room-box__text"]}>
                <h1>{room.name}</h1>
                <p>{room.description}</p>
                <p>{`Listeners : ${room.num_listeners}`}</p>
            </div>
        </div>
    )
})


RoomBox.propTypes = {
    room : PropTypes.object.isRequired
}

export default RoomBox;