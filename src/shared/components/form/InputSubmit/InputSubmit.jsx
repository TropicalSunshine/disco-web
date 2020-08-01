import React, { useEffect, useState } from "react";
import PropType from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles.module.css";

function InputSubmit({loading, value, disabled}){
    

    const defaultDisabled = disabled || false;

    const [isLoading, setIsLoading] = useState(loading);
    const [isDisabled, setDisabled ] = useState(defaultDisabled);

    useEffect(() => {

        setIsLoading(loading);
        setDisabled(disabled);
    }, [loading, disabled])


    return (
        <React.Fragment>
            <button
            disabled={isDisabled}
            className={`${styles.input}`}
            type="submit"
            >
                {
                    (!isLoading) && value
                }
                {
                    (isLoading) && <CircularProgress disableShrink={true}/>
                }
            </button>
        </React.Fragment>
    )
    
}

InputSubmit.propTypes = {
    value : PropType.string.isRequired,
    loading: PropType.bool.isRequired
};

export default InputSubmit;