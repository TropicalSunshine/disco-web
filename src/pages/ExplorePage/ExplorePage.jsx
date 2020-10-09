import React from "react";
import { Button } from "@material-ui/core";

import { HistoryPropTypes } from "shared/types";

import RoomsList from "./Rooms";

import styles from "./styles.module.css";


function ExplorePage({ history }) {

    return (

        <div className={`${styles["explore-container"]} box-column`}>
            <div>
                <Button
                    onClick={() => history.push("/r/create")}
                    variant="contained"
                    color="primary">
                    Create Room
                </Button>
            </div>
            <div className={`${styles["rooms-container"]}`}>
                <RoomsList history={history} />
            </div>
        </div>
    );
}

ExplorePage.propTypes = {
    ...HistoryPropTypes
};

export default ExplorePage;