import React from "react";

const PrimaryButton = ({children, className = "", ...props}) => {
    return (
        <button type="button" className={"btn btn-primary ".concat(className)} {...props}>{children}</button>        
    );
};

export default PrimaryButton;