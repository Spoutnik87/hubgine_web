import React from "react";

const NavItem = ({children, onClick, active, pill, ...props}) => {
    return (
        <div className="nav-item"><a className={(pill ? "nav-link-pill" : "nav-link nav-link-pointer") + (active ? " active" : "")} onClick={onClick} {...props}>{children}</a></div>
    );
};

export default NavItem;