import React, { Component } from 'react'
import "./MusicControls.css";

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
    constructor(){
        super();

        this.state = {
            play: false 
        }
    }

    render() {
        return (
            <div className="music-player-container">
                <div className="box-center">
                    <div className="music-player-control-button rewind-button">
                        <FastRewindIcon
                        onClick={(e)=> {
                            this.props.handlePrev(e);
                        }}
                        />
                    </div>
                    <div className="music-player-control-button play-button">
                        {
                            !this.state.play &&
                            (
                            <PlayIcon 
                            onClick={()=>{
                                this.props.handlePlay();
                                
                                this.setState({
                                    play: true
                                });
                            }}
                            style={{ fontSize: 50 }}/>
                            )
                        }
                        {
                            this.state.play && (
                                <PauseIcon
                                onClick={() => {
                                    this.props.handlePause();
                                    this.setState({
                                        play: false
                                    });
                                }}
                                style={{ fontSize: 50 }}
                                />
                            )
                        }
                    </div>
                    <div className="music-player-control-button foward-button">
                        <FastForwardIcon
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
