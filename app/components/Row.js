import React from "react";

const Row = ({children, className = "", ...props}) => {
    return (
        <div className={"row ".concat(className)} {...props}>{children}</div>
    );
};

export default Row;