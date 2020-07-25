import React, { PureComponent } from 'react';

import { LoaderPage } from "shared/components/index";

import { constants, connectSocket, joinSuccess,
         socket, emitPause, emitPlay,
          emitChangeSong } from "shared/utils/services/socket";

import YoutubePlayer from "shared/utils/services/YoutubePlayer.js";
import { getVideoInfoData } from "shared/utils/services/youtube";

import Axios from 'axios';
import * as Vibrant from "node-vibrant";

import SearchPanel from "./SearchPanel/SearchPanel.jsx";
import MusicControls from "./MusicControls/MusicControls.jsx";

import styles from "./style.module.css"

const WAIT_TIME = 300;

export default class Room extends PureComponent {
    
    constructor(){
        super();
        
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

    handleVideoSelect = async (vidId, v) => {
        this.loadAudio(vidId, 0, true, true);
                                    
        if(v.snippet.thumbnails.high.url){
            //console.log(v.snippet.thumbnails.default.url);
            // const pal = Vibrant.from(v.snippet.thumbnails.medium.url).getPalette();
            //console.log("pallette", pal);

            this.setState({
                songImage : v.snippet.thumbnails.high.url
            });
        }

        //call socket to emit that the song has changed
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
                        <div className={`box-row ${styles["room-container"]}`}>
                            <div className={styles["room-left-container"]}>
                                <SearchPanel
                                onVideoSelect={this.handleVideoSelect}
                                />
                            </div>
                            <div className={`box-column ${styles["room-central-container"]}`}>
                                
                                <div className={`box-center ${styles["player-display-box"]}`}>
                                    <div className={styles["player-disk"]} style={{
                                        animationPlayState : ((!this.state.paused) ? "running" : "paused"),
                                        backgroundImage : `url(${this.state.songImage})`
                                    }}>
                                        <i/>
                                    </div>
                                </div>
                                <div className={styles["player-control-container"]}>
                                    <MusicControls
                                    paused={this.state.paused}
                                    handlePlay={this.handleAudioPlay}
                                    handlePause={this.handleAudioPause}
                                    />
                                </div>
                            
                            </div>
                            <div className={styles["room-right-container"]}>
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
