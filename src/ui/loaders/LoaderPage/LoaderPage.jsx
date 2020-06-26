import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress"; 
import "./LoaderPage.css";

export default class LoaderPage extends Component {
    constructor(props){

        super(props);

        this.interval = null;
        this.state = {
            value: props.value,
            message: "",
            messageIndex: 0
        }

        this.messages = [
            "loading boga from server",
            "authorizing",
            "dededededde...."
        ]
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            var { messageIndex } = this.state;

            this.setState({
                message: this.messages[messageIndex]
            })
            
            messageIndex++;

            if(messageIndex === this.messages.length){
                messageIndex = 0;
            }

            this.setState({
                messageIndex : messageIndex
            });
            

        }, 1500);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps){
        if(prevProps.value !== this.props.value){
            
            this.setState({
                value: this.props.value
            });
        }
    }

    
    render() {
        return (
            <div className="loaderpage-container">
                <div className="loaderpage-center-box">
                    <div className="box-center">
                        <CircularProgress variant="static" value={this.state.value} />
                    </div>
                    <div className="box-center">
                        <h1>{this.state.message}</h1>
                    </div>
                </div>
            </div>
        )
    }
}
