import React from "react";

const DangerButton = ({children, className = "", ...props}) => {
    return (
        <button type="button" className={"btn btn-danger ".concat(className)} {...props}>{children}</button>        
    );
};

export default DangerButton;