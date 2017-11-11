import React from "react";

const WarningButton = (props) => {
    return (
        <button className="btn btn-warning" {...props}>{props.children}</button>
    );
};

export default WarningButton;