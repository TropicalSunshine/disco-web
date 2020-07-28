import React, { useEffect, useState } from "react";
import PropType from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles.module.css";

function InputSubmit(props){
    const {loading, value }  = props;

    const defaultDisabled = props.disabled || false;

    const [isLoading, setIsLoading] = useState(loading);
    const [disabled, setDisabled ] = useState(defaultDisabled);

    useEffect(() => {
        
        setIsLoading(loading);
        setDisabled(disabled);
    }, [props])


    return (
        <div>
            <button
            disabled={true}
            className={`${styles.input}`}
            type="submit"
            >
                {
                    !isLoading && value
                }
                {
                    isLoading && <CircularProgress disableShrink={true}/>
                }
            </button>
        </div>
    )
    
}

InputSubmit.propTypes = {
    value : PropType.string.isRequired,
    isLoading: PropType.bool.isRequired
};

export default InputSubmit;