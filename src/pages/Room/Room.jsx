import React, { PureComponent, useEffect, useState } from 'react';

import { LoaderPage } from "shared/components/index";

import { constants, connectSocket, joinSuccess,
         socket, emitPause, emitPlay,
          emitChangeSong } from "shared/utils/socket/socket";

//import YoutubePlayer from "shared/objects/YoutubePlayer.js";
import { getVideoInfoData } from "shared/utils/services/youtube";

import SearchPanel from "./SearchPanel";
import MusicControls from "./MusicControls";



import { useParams } from "react-router-dom";

import styles from "./style.module.css"


function Room(props){

    const { roomId } = useParams();
    const { musicRoom } = props;

    const { 
        isConnected,
        isLoading,
        paused,
        songImage,
        join,
        leave
    } = musicRoom;
    
    const [ loadingValue, setLoadingValue ] = useState(0);

    useEffect(() => {

        (async () => {
            

            await join(roomId);
            setLoadingValue(100);
            
        })()

        return () => {
            leave();
        }

    }, []);

    return (
        <React.Fragment>
            {
                isLoading && (
                    <LoaderPage value={loadingValue}/>
                )
            }
            {
                !isLoading && (
                    <div className={`box-row ${styles["room-container"]}`}>
                        <div className={styles["room-left-container"]}>
                            <SearchPanel/>
                        </div>
                        <div className={`box-column ${styles["room-central-container"]}`}>
                            
                            <div className={`box-center ${styles["player-display-box"]}`}>
                                <div className={styles["player-disk"]} style={{
                                    animationPlayState : ((!paused) ? "running" : "paused"),
                                    backgroundImage : `url(${songImage})`
                                }}>
                                    <i/>
                                </div>
                            </div>
                            <div className={styles["player-control-container"]}>
                                <MusicControls/>
                            </div>
                        
                        </div>
                        <div className={styles["room-right-container"]}>
                                {
                                    /*

                                    */
                                }
                            
                        </div>
                        
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default Room;

/*
export default class Room extends PureComponent {
    
    constructor(props){

        
        
        super(props);
        
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
        
        var defaultData = {
            songId: null,
            time: 0,
            paused: true 
        };


        this.setState({
            loadingValue: 25
        });

        var data = await joinSuccess();

        data = {
            ...defaultData,
            ...data
        }; 
        

        this.setState({
            loadingValue: 50
        });

        
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

    addSocketListeners = () => {
        
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
        
        this.youtubePlayer = new YoutubePlayer(songId, startTime, paused);
        await this.youtubePlayer.init(); 
    }

    loadVideoData = async (vidId) => {
        if (vidId === null) return;

        const data = await getVideoInfoData(vidId);
        
        if(data.snippet.thumbnails.high.url){
            this.setState({
                songImage : data.snippet.thumbnails.high.url
            });
        }
    }

    handleAudioPause = () => {
        
        

        emitPause(this.roomId);
        this.youtubePlayer.pause();
        this.setState({
            paused: true
        })
        
        socket.emit(constants.USERINPUT, {
            protocol: constants.controls.PAUSE,
            roomId: 123
        });
        
    }

    handleAudioPlay = () => {
        

        emitPlay(this.roomId);
        this.youtubePlayer.play();
        this.setState({
            paused: false
        })

        
        socket.emit(constants.USERINPUT, {
            protocol: constants.controls.PLAY,
            roomId: 123
        });
        
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
        
        await this.youtubePlayer.loadVideo(vidId, startSecond);
        

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
            //
            // const pal = Vibrant.from(v.snippet.thumbnails.medium.url).getPalette();
            //

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
                                     
                                }
                                
                            </div>
                            
                        </div>
                    )
                }
            </React.Fragment>
        )
    }
}
*/