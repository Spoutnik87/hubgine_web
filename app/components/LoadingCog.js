import React, { Component } from "react";
import PropTypes from "prop-types";

class LoadingCog extends Component {
    static propTypes = {
        center: PropTypes.bool
    };

    static defaultProps = {
        center: false
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        return false;
    }

    render()
    {
        const cog = <i className="fa fa-cog fa-spin fa-3x fa-fw" style={{ color: "#35B729" }}></i>;
        return (
            this.props.center ? <div className="center">{cog}</div> : cog
        );
    }
}

export default LoadingCog;