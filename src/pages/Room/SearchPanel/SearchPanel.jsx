import React, { Component, useState, useEffect } from 'react'
import styles from "./styles.module.css";

import SearchResultBlock from "./SearchResultBlock";
import { searchVideoByKeyword } from "shared/utils/services/youtube";

import { Spinner } from "shared/components/index";

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';


import { SearchOutlined as SearchIcon } from "@material-ui/icons";


const SEARCH_WAIT_INTERVAL = 500;


function SearchPanel(props){

    const [ isSearching, setIsSearching ] = useState(false);
    const [ searchResults, setSearchResults ] = useState([]);

    var searchInterval = null;

    const onSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const { value } = e.target;

        if(value === "") return;
        if(searchInterval) clearTimeout(searchInterval);
        console.log("[search interval] : ", searchInterval);
        setIsSearching(true);

        searchInterval = setTimeout(async () => {
            console.log("searching");
            await searchVideoByKeyword(value).then( response => {
                if(response){
                    setSearchResults(response.data.items);
                }
            });

            setIsSearching(false);
        }, SEARCH_WAIT_INTERVAL);
    

        
    }

    /*
    useEffect(() => {
        clearInterval(searchInterval);
        if(searchValue !== null){
            (async () => {

                setIsSearching(true);

                await new Promise(resolve => {
                    searchInterval = setTimeout(resolve, 500);
                });

                await searchVideoByKeyword(searchValue).then( response => {
                    setSearchResults(response.data.items);
                })

                setIsSearching(false);
            })();
        }
    }, [searchValue])
    */


    return (
        <div className={`box-column ${styles["search-panel"]}`}>
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}  className={styles["search-area"]}>
                <Input
                style={{
                    color: "white",
                    borderColor: "white"
                }}
                fullWidth={true}
                placeholder="Search"
                onChange={onSearch}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                />
            </form>
            <div className={styles["search-results"]}>
                {
                    isSearching && (
                        <Spinner/>
                    )
                }
                {
                    (!isSearching) && (
                        <ul className={styles["search-result-list"]}>
                         {
                            searchResults.map((r, i) => (
                                <SearchResultBlock
                                key={"search-result-" + i}
                                value={r}/>
                            ))
                        }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}


export default SearchPanel;