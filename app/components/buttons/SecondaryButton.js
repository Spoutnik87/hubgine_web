import React from "react";

const SecondaryButton = ({children, className = "", ...props}) => {
    return (
        <button type="button" className={"btn btn-secondary ".concat(className)} {...props}>{children}</button>        
    );
};

export default SecondaryButton;