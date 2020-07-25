import React, { Component } from 'react'
import styles from "./styles.module.css";

import { searchVideoByKeyword } from "shared/utils/services/youtube";

import { Spinner } from "shared/components/index";

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton";


import { SearchOutlined as SearchIcon, 
         AddOutlined as AddIcon,
         FavoriteOutlined as FavoriteIcon } from "@material-ui/icons";


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
            <div className={`box-column ${styles["search-panel"]}`}>
                <form className={styles["search-area"]}>
                    <Input
                    style={{
                        color: "white",
                        borderColor: "white"
                    }}
                    fullWidth={true}
                    placeholder="Search"
                    onChange={this.handleOnSearch}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    />
                </form>
                <div className={styles["search-results"]}>
                    {
                        this.state.isSearching && (
                            <Spinner/>
                        )
                    }
                    {
                        !this.state.isSearching && (
                            <ul className={styles["search-result-list"]}>
                             {
                                this.state.youtubeSearchResults.map((r, i) => {
                                return <ResultBlock 
                                key={"search-result-" + i}
                                onVideoSelect={this.props.onVideoSelect}
                                value={r}/>
                                })
                            }
                            </ul>
                        )
                    }
                </div>
            </div>
        )
    }
}


function ResultBlock(props){

    
    const v = props.value;
    const thumbnail = v.snippet.thumbnails.default;
    const snippet = v.snippet;

    return (
        <li className={`box-row ${styles["result-block"]}`}>
            <div className={styles["result-img-container"]}
            >
                <img
                src={thumbnail.url}
                width={thumbnail.width}
                height={thumbnail.height}
                />
            </div>
            <div className={`${styles["result-desc-container"]} box-row`}>
                <div className={`box-column ${styles["result-desc-text"]}`}>
                    <p style={{
                        overflow: "hidden",
                        fontSize: "10pt",
                        marginTop: "5px",
                        marginBottom: "5px"
                    }}>{snippet.title}</p>
                    <p style={{
                        fontSize: "6.5pt",
                        marginTop: "5px"
                    }}>{snippet.channelTitle}</p>
                </div>
                <div className={`box-row ${styles["result-desc-button"]}`}>
                    <IconButton 
                    onClick={() => {
                        props.onVideoSelect(v.id.videoId, v);
                    }} 
                    color="primary">
                        <AddIcon/>
                    </IconButton>
                </div>
                <div className={`box-row ${styles["result-desc-button"]}`}>
                    <IconButton 
                    onClick={() => {
                        props.onVideoSelect(v.id.videoId, v);
                    }} 
                    color="secondary">
                        <FavoriteIcon/>
                    </IconButton>
                </div>
            </div>
        </li>
    )
}