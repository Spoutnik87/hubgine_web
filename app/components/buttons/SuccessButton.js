import React from "react";

const SuccessButton = (props) => {
    return (
        <button className="btn btn-success" {...props}>{props.children}</button>
    );
};

export default SuccessButton;