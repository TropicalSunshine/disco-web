import React, { Component } from "react";
import { Button } from "@material-ui/core";

import RoomsList from "./Rooms";
import { Room } from "shared/utils/api";
import styles from "./styles.module.css";


class ExplorePage extends Component{

    constructor(props){
        super(props);

        this.state = {
        }
    }

    getRooms = () => {
        const { limit, last_id } = this.state;
        
        return Room.Rooms(limit, last_id).then(response => {
            
            var resp_length = response.length;

            if(response.length === 0){
                this.setState({
                    isLastQuery : true
                });

                return;
            }

            this.setState({
                last_id : response[resp_length - 1].id
            })

        });
    }


    async componentDidMount() {
        try {
            await this.getRooms();

        } catch (err) {

        }
    }

    render(){

        const { history } = this.props;

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
        )
    }


}

export default ExplorePage;