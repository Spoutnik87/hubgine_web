import React from "react";

const LinkButton = (props) => {
    return (
        <button className="btn btn-link" {...props}>{props.children}</button>
    );
};

export default LinkButton;