import React, { useState, useEffect } from 'react'

import PanelTabs from "./PanelTabs";
import SearchResultBlock from "./SearchResultBlock";
import { searchVideoByKeyword, getMostPopularVideos } from "shared/utils/services/youtube";
import { Spinner } from "shared/components/index";

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { SearchOutlined as SearchIcon } from "@material-ui/icons";

import styles from "./styles.module.css";

const SEARCH_WAIT_INTERVAL = 500;

const TAB_OPTIONS = [
    {
        name : "Search"
    },
    {
        name : "Queue"
    }
]

function SearchPanel(props){

    const [ isSearching, setIsSearching ] = useState(false);
    const [ searchResults, setSearchResults ] = useState([]);
    const [ tab, setTab ] = useState(0);

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
            const response = await searchVideoByKeyword(value);

            console.log(response);
            if(response){
                setSearchResults(response);
            }

            setIsSearching(false);
        }, SEARCH_WAIT_INTERVAL);
    };

    useEffect(() => {
        /*
        (async () => {
            const response = await getMostPopularVideos();
            console.log(response);
            setSearchResults(response);
        })();
        */
    }, [])

    const handleTabSelect = (i) => {
        setTab(i);
    }


    return (
        <div className={`box-column ${styles["search-panel"]}`}>
            <div className={`${styles["search-panel__tabs"]}`}>
                <PanelTabs
                    onChange={handleTabSelect}
                    options={TAB_OPTIONS}
                />
            </div>
            <div className={`${styles["search-panel__content"]}`}>
                {
                    (tab === 0) && (
                        <>
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
                        </>
                    )   
                }

            </div>
        </div>
    )
}


export default SearchPanel;