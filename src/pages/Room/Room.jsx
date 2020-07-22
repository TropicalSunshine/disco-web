import React, { Component } from 'react';
import { LoaderPage, MusicControls } from "shared/components/index";

import { constants, connectSocket, joinSuccess,
         socket, emitPause, emitPlay,
          emitChangeSong } from "shared/utils/services/socket";



import YoutubePlayer from "shared/utils/services/YoutubePlayer.js";
import { getVideoInfoData } from "shared/utils/services/youtube";

import Axios from 'axios';

import SearchPanel from "./SearchPanel.jsx";

import "./style.css"

const WAIT_TIME = 300;

export default class Room extends Component {

    constructor(){
        super();
    
        console.log();
        this.state = {
            paused: true,
            playing: false,
            songTime: 0,
            isLoading: true,
            loadingValue: 0,
            songImage : null
            
        }
        
        this.roomId = window.location.pathname.split("/")[2];
        
        this.seekWaitTimer = null;
        this.isWaitSeek = false;
        this.isSeekRequest = false;
        
        this.youtubePlayer = null;
    }

    //handlefile
    async componentDidMount(){
        await connectSocket();
        
        var data = {
            songId: null,
            time: 0,
            paused: true 
        };

        this.setState({
            loadingValue: 25
        });

        data = await joinSuccess();
        console.log(data);

        this.setState({
            loadingValue: 50
        });

        console.log(data);
        await this.initYoutubePlayer(data.songId, data.time, data.paused);
        await this.loadVideoData(data.songId);
        this.setState({
            loadingValue: 75
        });

        this.addSocketListeners();
        
        this.setState({
            loadingValue: 100,
            isLoading: false,
            paused: data.paused
        });
        //await downloadAssets();
    }

    socketFirstUpdate = () => {
        return new Promise((res, rej) => {
            socket.on(constants.UPDATE, (data) => {

            })
        })
    }


    getYoutubeMetaData = async () => {
        var vid = "3r_Z5AYJJd4";
        await Axios.get("https://"+vid+"-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D" + vid, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            console.log(response);
        });
    }

    addSocketListeners = () => {
        console.log("initing sockets");
        //socket.on(constants.USERJOINROOM, this.handleUserJoinRoom.bind(this));
        socket.on(constants.UPDATE, (data) => {
            this.loadAudio(data.songId, data.time, !data.paused);
        });

        socket.on(constants.USERCHANGESONG, (data) => {
            this.loadAudio(data.songId);
        });

        socket.on(constants.controls.SEEK, (data) => {
            this.isSeekRequest = true;
        });
        
        socket.on(constants.controls.PAUSE, this.handleSocketInput);
        socket.on(constants.controls.PLAY, this.handleSocketInput);
        
    }


    handleSocketInput = (data) => {
        console.log("input from server: ", data);

        this.setState({
            paused: data.paused
        });

        if(data.paused){
            this.youtubePlayer.pause();
        } else if (!data.paused){
            this.youtubePlayer.play();
        }
    }

    initYoutubePlayer = async (songId=null, startTime=0, paused=true) => {
        console.log(window["YT"]);
        this.youtubePlayer = new YoutubePlayer(songId, startTime, paused);
        await this.youtubePlayer.init(); 
    }

    loadVideoData = async (vidId) => {
        if (vidId === null) return;

        const data = await getVideoInfoData(vidId);
        console.log(data);
        if(data.snippet.thumbnails.high.url){
            this.setState({
                songImage : data.snippet.thumbnails.high.url
            });
        }
    }


    
    handleAudioSeek = (e) => {
        
        if(!this.isSeekRequest){
            //fire event on last seek
            console.log("firing seek");
            e.preventDefault();
            e.stopPropagation();
            console.log("seeking");
            const audio = this.audioRef.current;
            //current time audio.currentTime
    
    
            clearTimeout(this.seekWaitTimer);
        
    
            this.seekWaitTimer = setTimeout( function() {
                console.log("emiting socket seeking");
                
                socket.emit(constants.USERINPUT, {
                    protocol: constants.controls.SEEK,
                    duration: audio.currentTime,
                    roomId: this.roomId
                })
                
            }, WAIT_TIME);
        }

        this.isSeekRequest = false;
        

    }

    handleAudioPause = () => {
        
        console.log("pausing song");

        emitPause(this.roomId);
        this.youtubePlayer.pause();
        this.setState({
            paused: true
        })
        /*
        socket.emit(constants.USERINPUT, {
            protocol: constants.controls.PAUSE,
            roomId: 123
        });
        */
    }

    handleAudioPlay = () => {
        console.log("playing song");

        emitPlay(this.roomId);
        this.youtubePlayer.play();
        this.setState({
            paused: false
        })

        /*
        socket.emit(constants.USERINPUT, {
            protocol: constants.controls.PLAY,
            roomId: 123
        });
        */
    }

    setPausePromise = (val=true) => {
        return new Promise((res, rej) => {
            this.setState({
                paused:val
            }, () => {
                res();
            });
        })
    }

    loadAudio = async (vidId, startSecond=0, play=true, emit=false) => {

        await this.setPausePromise(true);
        console.log("pausing");
        await this.youtubePlayer.loadVideo(vidId, startSecond);
        console.log("playing");

        if(emit) emitChangeSong(this.roomId, this.youtubePlayer);

        if(play){
            await this.setPausePromise(false)
            this.youtubePlayer.play();
        } else {
            this.youtubePlayer.pause();
        }
        
    }


    handleUserJoinRoom(data){
                
    }


    render() {
        
        return (
            <React.Fragment>
                <div id="player"></div>
                {
                    this.state.isLoading && (
                        <LoaderPage value={this.state.loadingValue}/>
                    )
                }
                {
                    !this.state.isLoading && (
                        <div className="room-container box-row">
                            <div className="room-left-container">
                                <SearchPanel
                                onVideoSelect={(vidId, v) => {
                                    this.loadAudio(vidId, 0, true, true);
                                    console.log("v", v);
                                    if(v.snippet.thumbnails.high.url){

                                        this.setState({
                                            songImage : v.snippet.thumbnails.high.url
                                        });
                                    }
                                    //call socket to emit that the song has changed
                                    
                                }}
                                />
                            </div>
                            <div className="room-central-container box-column">
                                
                                <div className="box-center player-display-box">
                                    <div className="player-disk" style={{
                                        backgroundImage : `url(${this.state.songImage})`,
                                        animationPlayState : (!this.state.paused) ? "running" : "paused"
                                    }}>
                                        <i/>
                                    </div>
                                </div>
                                <div className="player-control-container">
                                    <MusicControls
                                    paused={this.state.paused}
                                    handlePlay={this.handleAudioPlay}
                                    handlePause={this.handleAudioPause}
                                    />
                                </div>
                            
                            </div>
                            <div className="room-right-container">
                                {
                                    /*
                                    <audio id="audio" controls
                                    type="audio/mpeg"
                                    ref = {this.audioRef}
                                    onSeeked = {this.handleAudioSeek}
                                    onPause = {this.handleAudioPause}
                                    onPlay = {this.handleAudioPlay}>
                                    </audio>
                                     */
                                }
                                
                            </div>
                            
                        </div>
                    )
                }
            </React.Fragment>
        )
    }
}
