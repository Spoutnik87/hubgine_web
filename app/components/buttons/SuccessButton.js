import React from "react";

const SuccessButton = ({children, className = "", ...props}) => {
    return (
        <button type="button" className={"btn btn-success ".concat(className)} {...props}>{children}</button>
    );
};

export default SuccessButton;