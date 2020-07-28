import React from "react";

import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/Styles";


function WrappedInput(props){
    const { classes, className, ...rest } = props;
    
    return <Input className={`${classes.root} ${className}`} 
    {...rest} />;
}


const styles = {
    root : {
        color: "var(--WHITE)",
        borderColor: "var(--WHITE)"
    }
}

export default withStyles(styles)(WrappedInput);