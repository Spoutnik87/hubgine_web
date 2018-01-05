import React from "react";

const LinkButton = ({children, className = "", ...props}) => {
    return (
        <button type="button" className={"btn btn-link ".concat(className)} {...props}>{children}</button>
    );
};

export default LinkButton;