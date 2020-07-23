import React, { Component } from 'react'
import styles from "./styles.module.css";

import PlayIcon from "@material-ui/icons/PlayArrowSharp"
import PauseIcon from "@material-ui/icons/PauseSharp";
import FastForwardIcon from "@material-ui/icons/FastForwardSharp";
import FastRewindIcon from "@material-ui/icons/FastRewindSharp";


/*

props req
    
    handlePlay
    handleNext
    handlePrev
 */

export default class MusicPlayer extends Component {
    constructor(props){
        super(props);

        this.state = {
            paused: props.paused
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.paused !== this.props.paused){
            console.log(this.props.paused);
            this.setState({
                paused: this.props.paused
            })
        }
    }

    render() {
        return (
            <div className={styles["music-player-container"]}>
                <div className="box-center">
                    <div className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}>
                        <FastRewindIcon
                        style={{ fontSize: 45 }}
                        onClick={(e)=> {
                            this.props.handlePrev(e);
                        }}
                        />
                    </div>
                    <div className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}>
                        {
                            this.state.paused &&
                            (
                            <PlayIcon 
                            onClick={()=>{
                                this.props.handlePlay();
                            }}
                            style={{ fontSize: 50 }}/>
                            )
                        }
                        {
                            !this.state.paused && (
                                <PauseIcon
                                onClick={() => {
                                    this.props.handlePause();
                                }}
                                style={{ fontSize: 45 }}
                                />
                            )
                        }
                    </div>
                    <div className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}>
                        <FastForwardIcon
                        style={{ fontSize: 50 }}
                        onClick={(e) => {
                            this.props.handleNext(e);
                        }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
