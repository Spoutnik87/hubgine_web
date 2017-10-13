import React from "react";

const DangerButton = ({ children, ...props}) => {
    return (
        <button className="btn btn-danger" {...props}>{children}</button>        
    );
};

export default DangerButton;