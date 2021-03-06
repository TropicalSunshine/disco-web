import React, { useState, useEffect } from "react";
import { AllHtmlEntities } from "html-entities";

import PanelTabs from "../shared/PanelTabs";
import SongItem from "./SongItem";
import useSongQueueReducer, { ACTIONS } from "./hooks/useSongQueueReducer";
import attachSearchPanelListeners from "./attachSearchPanelListeners";

import { youtube } from "shared/utils/services";
import { Spinner } from "shared/components/index";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
    SearchOutlined as SearchIcon,
    DeleteOutlineRounded as DeleteIcon,
    AddOutlined as AddIcon,
} from "@material-ui/icons";

import styles from "./styles.module.css";
import { DEFAULT_SONG } from "../DEFAULTS";
import { useRef } from "react";

//const SEARCH_WAIT_INTERVAL = 1000;

const TAB_OPTIONS = [
    {
        name: "Search",
    },
    {
        name: "Queue",
    },
];

function SearchPanel() {
    const addedSongIdMap = useRef(new Map());

    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [tab, setTab] = useState(0);

    const [prevSearchVal, setPrevSearchVal] = useState("");

    const { songQueue, songQueueDispatch } = useSongQueueReducer();

    const { bind, unbind } = attachSearchPanelListeners(songQueueDispatch, addedSongIdMap);


    //var searchInterval = useRef(null);

    const search = async (value) => {
        setIsSearching(true);
        const response = await youtube.searchVideoByKeyword(value);

        setPrevSearchVal(value)
        if (response) {
            setSearchResults(response);
        }

        setIsSearching(false);
    };
    /*
    const onSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const { value } = e.target;

        if (value === "") return;
        clearTimeout(searchInterval.current);
        searchInterval.current = setTimeout(
            () => search(value),
            SEARCH_WAIT_INTERVAL
        );
    };
    */

    const handleOnKeyPress = (e) => {
        const { value } = e.target;
        
        if(e.key === "Enter" && value !== prevSearchVal && !isSearching){
            search(value)
        }
    }

    const getPopularVideos = async () => {
        const response = await youtube.getMostPopularVideos();
        setSearchResults(response);
    };

    /* eslint-disable */

    useEffect(() => {
        bind();

        getPopularVideos();

        return () => {
            unbind();
        };
    }, []);
    /* eslint-enable */

    const handleTabSelect = (i) => setTab(i);

    return (
        <div className={`box-column ${styles["search-panel"]}`}>
            <div className={`${styles["search-panel__tabs"]}`}>
                <PanelTabs onChange={handleTabSelect} options={TAB_OPTIONS} />
            </div>
            <div className={`${styles["search-panel__content"]}`}>
                {tab === 0 && (
                    <>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            className={styles["search-area"]}
                        >
                            <Input
                                className={styles["search-area__input"]}
                                fullWidth={true}
                                placeholder="Search"
                                onKeyPress={handleOnKeyPress}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </form>
                        <div
                            className={`
                        ${styles["search-results"]}
                        ${isSearching ? "box-center" : null}
                        `}
                        >
                            {isSearching && <Spinner />}
                            {!isSearching && (
                                <ul className={styles["search-result-list"]}>
                                    {searchResults.map((r, i) => {
                                        const { snippet, id } = r;


                                        var value = {
                                            ...DEFAULT_SONG,
                                            songId: id.videoId ? id.videoId : id,
                                            songImage: snippet.thumbnails,
                                            songTitle: AllHtmlEntities.decode(snippet.title),
                                            songArtist: AllHtmlEntities.decode(snippet.channelTitle)
                                        };

                                        return (
                                            <SongItem
                                                key={"search-result-" + i}
                                                value={value}
                                                actions={[
                                                    {
                                                        Icon: AddIcon,
                                                        onClick: () => {
                                                            addedSongIdMap.current.set(value.songId, true);
                                                            songQueueDispatch({
                                                                type: ACTIONS.ADD_SONG,
                                                                payload: value,
                                                            });
                                                        },
                                                        clicked: addedSongIdMap.current.has(value.songId)
                                                    },
                                                ]}
                                            />
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </>
                )}
                {tab === 1 && (
                    <>
                        <ul className={styles["search-results"]}>
                            {songQueue.map((v, i) => {
                                return (
                                    <SongItem
                                        key={"search-result-" + i}
                                        value={v}
                                        actions={[
                                            {
                                                Icon: DeleteIcon,
                                                onClick: () => {
                                                    addedSongIdMap.current.delete(v.songId);
                                                    songQueueDispatch({
                                                        type: ACTIONS.REMOVE_SONG,
                                                        payload: v,
                                                    });
                                                },
                                                clicked: false
                                            },
                                        ]}
                                    />
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchPanel;
