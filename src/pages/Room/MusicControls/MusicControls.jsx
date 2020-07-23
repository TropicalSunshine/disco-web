import React, { PureComponent } from 'react'
import PropTypes from "prop-types";
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

export default class MusicControls extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div className={styles["music-player-container"]}>
                <div className="box-center">
                    <div className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}>
                        <FastRewindIcon
                        className={`${styles.icon}`}
                        
                        onClick={(e)=> {
                            this.props.handlePrev(e);
                        }}
                        />
                    </div>
                    <div className={`${styles["music-player-control-button"]} ${styles["play-button"]}`}>
                        {
                            this.props.paused &&
                            (
                            <PlayIcon 
                            className={`${styles.icon}`}
                            onClick={()=>{
                                this.props.handlePlay();
                            }}
                            />
                            )
                        }
                        {
                            !this.props.paused && (
                                <PauseIcon
                                className={`${styles.icon}`}
                                onClick={() => {
                                    this.props.handlePause();
                                }}
                                />
                            )
                        }
                    </div>
                    <div className={`${styles["music-player-control-button"]} ${styles["rewind-button"]}`}>
                        <FastForwardIcon
                        className={`${styles.icon}`}
                        
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


MusicControls.propTypes = {
    paused : PropTypes.bool.isRequired,
    handlePause : PropTypes.func.isRequired
} 