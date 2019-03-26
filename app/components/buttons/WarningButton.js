import React from "react";

const WarningButton = ({children, className = "", ...props}) => {
    return (
        <button type="button" className={"btn btn-warning ".concat(className)} {...props}>{children}</button>
    );
};

export default WarningButton;