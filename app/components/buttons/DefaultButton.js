import React from "react";

const DefaultButton = (props) => {
    return (
        <button className="btn btn-default" {...props}>{props.children}</button>        
    );
};

export default DefaultButton;