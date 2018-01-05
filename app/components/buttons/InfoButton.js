import React from "react";

const InfoButton = ({children, className = "", ...props}) => {
    return (
        <button type="button" className={"btn btn-info ".concat(className)} {...props}>{children}</button>
    );
};

export default InfoButton;