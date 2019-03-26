import React from "react";

const FormGroup = ({children, className = "", ...props}) => {
    return (
        <div className={"form-group ".concat(className)} {...props}>{children}</div>
    );
};

export default FormGroup;