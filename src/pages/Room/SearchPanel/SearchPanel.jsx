import React, { Component, useState, useEffect } from 'react'
import styles from "./styles.module.css";

import SearchResultBlock from "./SearchResultBlock";
import { searchVideoByKeyword } from "shared/utils/services/youtube";

import { Spinner } from "shared/components/index";

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';


//remove
import IconButton from "@material-ui/core/IconButton";
import { SearchOutlined as SearchIcon, 
    AddOutlined as AddIcon,
    FavoriteOutlined as FavoriteIcon } from "@material-ui/icons";



function SearchPanel(props){

    const [ isSearching, setIsSearching ] = useState(false);
    const [ searchResults, setSearchResults ] = useState([]);
    const [ searchValue, setSearchValue ] = useState(null);

    const searchInterval = null;

    const onSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }

    useEffect(() => {
        clearInterval(searchInterval);
        if(searchValue !== null){
            (async () => {

                setIsSearching(true);

                await new Promise(resolve => {
                    searchInterval = setTimeout(resolve, 300);
                });

                await searchVideoByKeyword(searchValue).then( response => {
                    setSearchResults(response.data.items);
                })

                setIsSearching(false);
            })();
        }
    }, [searchValue])


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