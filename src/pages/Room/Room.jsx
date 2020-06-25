import React, { Component } from 'react';

import testmp3 from "../../audio/test.mp3";

import LoaderPage from "ui/index";

import {connect, socket, roomId, getcurrentState} from "../../network";
import { downloadAssets } from "../../assets";
import constants from "../../constants";



export default class MainPlayer extends Component {

    constructor(){
        super();
        
        this.WAIT_TIME = 500;

        this.state = {
            paused: false,
            playing: false,
            songTime: 0,
            isLoading: true
        }
        

        this.audioContext = new AudioContext();

        this.audioRef = React.createRef();
        this.canvasRef = React.createRef();
        this.fileRef = React.createRef();

        this.handleSeek = this.handleSeek.bind(this);
        this.handleAudioSeek = this.handleAudioSeek.bind(this);

        this.seekWaitTimer = null;
        this.isWaitSeek = false;
        this.isSeekRequest = false;

    }

    //handlefile
    async componentDidMount(){
        //await connect();
        //await downloadAssets();


        socket.on(constants.USERJOINROOM, this.handleUserJoinRoom.bind(this));
        socket.on(constants.controls.PAUSE, this.handleInput.bind(this));
        socket.on(constants.controls.PLAY, this.handleInput.bind(this));
        socket.on(constants.controls.SEEK, this.handleSeek.bind(this));
    


        var canvas = this.canvasRef.current;
        var audio = this.audioRef.current;
        var files = this.fileRef.current.files;


        //audio.src = URL.createObjectURL(files[0]);
        console.log(audio.src);

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
    
          const multiplyer = (window.innerHeight * 0.003);
        
          
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

            this.audioContext.resume().then(
                getcurrentState().then(resp => resp.json()).then((json) => {
                    
                    if(json.song.play){
                        audio.play();
                    } else if(json.song.pause){
                        audio.pause();
                    }

                    this.isSeekRequest = true;
                    audio.currentTime = json.song.duration;
            }));
        })


        renderFrame();
    }

    
    handleAudioSeek(e){
        return;
        if(!this.isSeekRequest){
            //fire event on last seek
            e.preventDefault();
            e.stopPropagation();
            console.log("seeking");
            const audio = this.audioRef.current;
            //current time audio.currentTime
    
    
            clearTimeout(this.seekWaitTimer);
        
    
            this.seekWaitTimer = setTimeout( function() {
                console.log("emiting socket seeking");
                
                socket.emit(constants.USERINPUT, {
                    status: constants.controls.SEEK,
                    duration: audio.currentTime,
                    roomId: roomId
                })
                
            }, this.WAIT_TIME);
        }

        this.isSeekRequest = false;
        

    }

    handleAudioPause(){
        
        console.log("pausing song");
        socket.emit(constants.USERINPUT, {
            protocol: constants.controls.PAUSE,
            roomId: 123
        });
    }

    handleAudioPlay(){
        console.log("playing song");
        socket.emit(constants.USERINPUT, {
            protocol: constants.controls.PLAY,
            roomId: 123
        });
    }

    handleInput(data){
        var audio = this.audioRef.current;

        console.log("input from server: ", data);
        if(data.song.paused){
            audio.pause();
        } else if (data.song.play){
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

        var time = this.state.songTime;
        
        return (
            <div>
                <input type="file" id="thefile" accept="audio/*"
                    ref = {this.fileRef} />
                <canvas ref = {this.canvasRef} id="canvas"></canvas>
                <audio id="audio" controls
                ref = {this.audioRef}
                onSeeked = {this.handleAudioSeek}
                onPause = {this.handleAudioPause}
                onPlay = {this.handleAudioPlay}>
                </audio>
            </div>
        )
    }
}
