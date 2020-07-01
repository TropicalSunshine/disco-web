import React, { Component } from 'react'

import { searchVideoByKeyword } from "services/youtubeApi";
import TextField from "@material-ui/core/TextField";

import { Spinner } from "ui/index";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from "@material-ui/icons/SearchOutlined";

export default class SearchPanel extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchValue: "",
            youtubeSearchResults: [],
            isSearching: false
        }

        this.searchInterval = null;
    }

    async componentDidMount(){
    }

    handleOnSearch = (a, b, c) => {
    
        this.setState({
            searchValue: a.target.value
        }, () => {
            this.search();
        })

    }

    search = async () => {
        clearTimeout(this.searchInterval);

        this.setState({
            isSearching: true
        });

        this.searchInterval = await new Promise(resolve => {
            this.searchInterval = setTimeout(resolve, 300);
        });
        
        const { searchValue } = this.state;

        await searchVideoByKeyword(searchValue).then(response => {
            this.setState({
                youtubeSearchResults: response.data.items
            })
        })

        this.setState({
            isSearching: false
        });

    }

    render() {
        return (
            <div className="box-column search-panel">
                <div className="search-area">
                    <FormControl>
                        <Input
                        placeholder="Search"
                        id="input-with-icon-adornment"
                        onChange={this.handleOnSearch}
                        startAdornment={
                            <InputAdornment position="start">
                             <SearchIcon />
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                </div>
                <div className="search-results">
                    {
                        this.state.isSearching && (
                            <Spinner/>
                        )
                    }
                    {
                        !this.state.isSearching && this.state.youtubeSearchResults.map(r => {
                            return <ResultBlock 
                            onVideoSelect={this.props.onVideoSelect}
                            value={r}/>
                        })
                    }
                </div>
            </div>
        )
    }
}


function ResultBlock(props){

    
    const v = props.value;
    console.log(props);
    console.log(v);
    const thumbnail = v.snippet.thumbnails.default;

    return (
        <div className="box-row">
            <div className="result-img-container"
            onClick={() => {
                props.onVideoSelect(v.id.videoId);
            }}
            >
                <img
                src={thumbnail.url}
                width={thumbnail.width}
                height={thumbnail.height}
                />
            </div>
            <div>

            </div>
        </div>
    )
}