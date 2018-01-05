import React from "react";

const InputGroup = ({children, className = "", ...props}) => {
    return (
        <div className={"input-group ".concat(className)} {...props}>{children}</div>
    );
};

export default InputGroup;