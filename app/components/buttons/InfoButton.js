import React from "react";

const InfoButton = (props) => {
    return (
        <button className="btn btn-info" {...props}>{props.children}</button>
    );
};

export default InfoButton;