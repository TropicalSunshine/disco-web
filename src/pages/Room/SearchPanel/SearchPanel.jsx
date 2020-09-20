import React, { useState, useEffect } from "react";

import PanelTabs from "../shared/PanelTabs";
import SongItem from "./SongItem";
import useSongQueueReducer, { ACTIONS } from "./hooks/useSongQueueReducer";
import attachSearchPanelListeners from "./hooks/attachSearchPanelListeners";

import {
    youtube
} from "shared/utils/services";
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

const SEARCH_WAIT_INTERVAL = 500;

const TAB_OPTIONS = [
    {
        name: "Search",
    },
    {
        name: "Queue",
    },
];

function SearchPanel() {
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [tab, setTab] = useState(0);

    const { songQueue, songQueueDispatch } = useSongQueueReducer();

    const { bind, unbind } = attachSearchPanelListeners(
        songQueueDispatch
    );

    var searchInterval = null;

    const onSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const { value } = e.target;

        if (value === "") return;
        if (searchInterval) clearTimeout(searchInterval);
        console.log("[search interval] : ", searchInterval);
        setIsSearching(true);

        searchInterval = setTimeout(async () => {
            console.log("searching");
            const response = await youtube.searchVideoByKeyword(value);

            if (response) {
                setSearchResults(response);
            }

            setIsSearching(false);
        }, SEARCH_WAIT_INTERVAL);
    };

    /* eslint-disable */

    useEffect(() => {
        bind();
        /*
            (async () => {
                const response = await youtube.getMostPopularVideos();
                console.log(response);
                setSearchResults(response);
            })();
            */

        return () => {
            unbind();
        };
    }, [bind, unbind]);
    /* eslint-enable */

    const handleTabSelect = (i) => {
        setTab(i);
    };

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
                                onChange={onSearch}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </form>
                        <div className={styles["search-results"]}>
                            {isSearching && <Spinner />}
                            {!isSearching && (
                                <ul className={styles["search-result-list"]}>
                                    {searchResults.map((r, i) => {
                                        const { snippet, id } = r;

                                        var value = {
                                            ...DEFAULT_SONG,
                                            songId: id.videoId,
                                            songImage: snippet.thumbnails,
                                            songTitle: snippet.title,
                                            songArtist: snippet.channelTitle,
                                        };

                                        return (
                                            <SongItem
                                                key={"search-result-" + i}
                                                value={value}
                                                actions={[
                                                    {
                                                        Icon: AddIcon,
                                                        onClick: () => {
                                                            songQueueDispatch({
                                                                type: ACTIONS.ADD_SONG,
                                                                payload: value,
                                                            });
                                                        },
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
                                                    songQueueDispatch({
                                                        type: ACTIONS.REMOVE_SONG,
                                                        payload: v,
                                                    });
                                                },
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
