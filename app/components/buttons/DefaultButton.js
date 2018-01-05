import React from "react";

const DefaultButton = ({children, className = "", ...props}) => {
    return (
        <button type="button" className={"btn btn-default ".concat(className)} {...props}>{children}</button>        
    );
};

export default DefaultButton;