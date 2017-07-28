import React from "react";

const LoadingCog = (props) => {
    const cog = <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{ color: "#35B729" }} ></i>;
    return (
        props.center ? <div style={{ textAlign: "center" }}>{cog}</div> : cog
    );
}

export default LoadingCog;