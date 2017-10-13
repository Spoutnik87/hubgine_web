import React from "react";

const PrimaryButton = (props) => {
    return (
        <button className="btn btn-primary" {...props}>{props.children}</button>        
    );
};

export default PrimaryButton;