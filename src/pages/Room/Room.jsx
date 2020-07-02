import React, { Component } from 'react';

import testmp3 from "audio/test.mp3";


import { LoaderPage, MusicControls } from "ui/index";

import {connect, socket, roomId, getcurrentState} from "network";
import { downloadAssets } from "assets";
import { constants } from "constants.js";

import YoutubePlayer from "services/YoutubePlayer.js";
import Axios from 'axios';

import SearchPanel from "./SearchPanel.jsx";

import "./Room.css"

const WAIT_TIME = 300;

export default class Room extends Component {

    constructor(){
        super();
    

        this.state = {
            paused: true,
            playing: false,
            songTime: 0,
            isLoading: true,
            loadingValue: 0
        }
        

        this.audioContext = new AudioContext();

        this.audioRef = React.createRef();
        this.canvasRef = React.createRef();

        this.handleSeek = this.handleSeek.bind(this);
        this.handleAudioSeek = this.handleAudioSeek.bind(this);
        this.seekWaitTimer = null;
        this.isWaitSeek = false;
        this.isSeekRequest = false;
        
        this.youtubePlayer = null;
    }

    //handlefile
    async componentDidMount(){
        //await connect();
        //await this.getYoutubeMetaData();

        await this.initYoutubePlayer();
        

        this.setState({
            loadingValue: 100,
            isLoading: false
        }, () => {
            //this.addSocketListeners();
            //this.initCanvas();
        });
        //await downloadAssets();
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
        socket.on(constants.USERJOINROOM, this.handleUserJoinRoom.bind(this));
        socket.on(constants.controls.PAUSE, this.handleInput.bind(this));
        socket.on(constants.controls.PLAY, this.handleInput.bind(this));
        socket.on(constants.controls.SEEK, this.handleSeek.bind(this));
    }

    initYoutubePlayer = async () => {
        console.log(window["YT"]);
        this.youtubePlayer = new YoutubePlayer();
        await this.youtubePlayer.init(); 
    }

    initCanvas = () => {


        var canvas = this.canvasRef.current;
        var audio = this.audioRef.current;
        


        audio.crossOrigin = "anonymous";
        audio.src = testmp3;
    

        var context = this.audioContext;
        var src = context.createMediaElementSource(audio);
        var analyser = context.createAnalyser();
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");
    
        src.connect(analyser);
        console.log(analyser)
        analyser.connect(context.destination);
    
        analyser.fftSize = 256;
    
        var bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
        
        var dataArray = new Uint8Array(bufferLength);
        
    
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
    
        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;
    
        function renderFrame() {
          requestAnimationFrame(renderFrame);
    
          x = 0;
    
          analyser.getByteFrequencyData(dataArray);
    
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
          const multiplyer = (window.innerHeight * 0.004);
        
          
          for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * multiplyer;
            
            var r = barHeight + (25 * (i/bufferLength));
            var g = 250 * (i/bufferLength);
            var b = 50;
    
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    
            x += barWidth + 1;
          }
        }

        
        document.addEventListener("click", () => {

            this.audioContext.resume()
            /*
            .then(
                getcurrentState().then(resp => resp.json()).then((json) => {
                    console.log(json);
                    if(json.song.play){
                        audio.play();
                    } else if(json.song.pause){
                        audio.pause();
                    }

                    this.isSeekRequest = true;
                    audio.currentTime = json.song.duration;
            }));
            */
        })
        

        this.audioContext.resume();
        renderFrame();
    }

    
    handleAudioSeek(e){
        
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
                    roomId: roomId
                })
                
            }, WAIT_TIME);
        }

        this.isSeekRequest = false;
        

    }

    handleAudioPause = () => {
        
        console.log("pausing song");
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

    handleAudioLoad = async (vidId) => {

        await this.setPausePromise(true);
        console.log("pausing");
        await this.youtubePlayer.loadVideo(vidId);
        console.log("playing");
        await this.setPausePromise(false)
        
        this.youtubePlayer.play();
    }

    handleInput(data){
        var audio = this.audioRef.current;

        console.log("input from server: ", data);
        if(data.song.paused){
            audio.pause();
        } else if (!data.song.paused){
            audio.play();
        }
    }

    handleSeek(data){
        this.isSeekRequest = true;
        this.audioRef.current.currentTime = data.song.duration;
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
                                onVideoSelect={this.handleAudioLoad}
                                />
                            </div>
                            <div className="room-central-container box-column">
                                {
                                    //<canvas ref = {this.canvasRef} id="canvas"></canvas>
                                }
                                <div className="room-central-holder">
                                    <h1>asd</h1>
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
