import React, { useState } from "react";
import PropTypes from "prop-types";

import DoneIcon from "@material-ui/icons/DoneRounded";
import IconButton from "@material-ui/core/IconButton";
import styles from "./SongItem.module.css";

function SongItem({ value, actions }) {
    const { songImage, songTitle, songArtist } = value;

    const [clicked, setClicked] = useState(() => {
        var clickedInit = [];
        for (let i = 0; i < actions.length; i++) {
            clickedInit.push(false);
        }

        return clickedInit;
    });

    const thumbnail = songImage.default;

    const handleClick = (i) => {
        actions[i].onClick();

        setClicked((prevClicked) => {
            var copy = [...prevClicked];
            copy[i] = true;
            return copy;
        });
    };

    return (
        <li className={`box-row ${styles["result"]}`}>
            <div className={styles["result__img"]}>
                <img
                    alt={"thumbnail"}
                    src={thumbnail.url}
                    width={thumbnail.width}
                    height={thumbnail.height}
                />
            </div>
            <div className={`${styles["result__desc"]} box-row`}>
                <div className={`box-column ${styles["result__desc__text"]}`}>
                    <p className={styles["result__desc__text__title"]}>{songTitle}</p>
                    <p className={styles["result__desc__text__channel-name"]}>
                        {songArtist}
                    </p>
                </div>
                {actions.map((a, i) => {
                    var { Icon } = a;

                    return (
                        <div
                            key={`song-item-action-${i}`}
                            className={`box-center ${styles["result__desc__button"]}`}
                        >
                            {!clicked[i] && !a.clicked && (
                                <IconButton onClick={() => handleClick(i)} color="primary">
                                    <Icon />
                                </IconButton>
                            )}
                            {(clicked[i] || a.clicked) && (
                                <DoneIcon className={styles["result__desc__done"]} />
                            )}
                        </div>
                    );
                })}
            </div>
        </li>
    );
}

SongItem.propTypes = {
    value: PropTypes.shape({
        songImage: PropTypes.object.isRequired,
        songTitle: PropTypes.string.isRequired,
        songArtist: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            Icon: PropTypes.elementType.isRequired,
            onClick: PropTypes.func.isRequired,
            clicked: PropTypes.bool.isRequired,
        })
    ).isRequired,
    clicked: PropTypes.bool.isRequired,
};

export default SongItem;
