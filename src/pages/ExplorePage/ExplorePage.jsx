import React from "react";
import { Button } from "@material-ui/core";

import { HistoryPropTypes } from "shared/types";
import PropTypes from "prop-types";
import RoomsList from "./Rooms";

import styles from "./styles.module.css";


function ExplorePage (props){

    const { history } = props;

    return (
        
        <div className={`${styles["explore-container"]} box-column`}>
            <div className={`${styles["category-container"]}`}>
                <Button onClick={() => {
                    this.props.history.push("/room/create");
                }} variant="contained" color="primary">
                    Create Room
                </Button>
            </div>
            <div className={`${styles["room-container"]}`}>
                <RoomsList history={history} />
            </div>
        </div>
    );
}

ExplorePage.propTypes = {
    ...HistoryPropTypes
};

export default ExplorePage;