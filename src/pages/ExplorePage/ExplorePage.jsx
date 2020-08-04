import React from "react";
import { PureComponent } from "react";

import { Button } from "@material-ui/core";
import styles from "./styles.module.css";
import { Prompt } from "react-router-dom";

class ExplorePage extends PureComponent{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return (
            <div className={`${styles["explore-container"]} box-column`}>
                <div className={`${styles["category-container"]}`}>
                    <Button onClick={() => {
                        console.log("hererere");
                        console.log(this.props);
                        this.props.history.push("/room/create");
                    }} variant="contained" color="primary">
                        Create Room
                    </Button>
                </div>
            </div>
        )
    }


}

export default ExplorePage;