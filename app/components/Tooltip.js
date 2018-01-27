import React, { Component } from "react";
import PropTypes from "prop-types";

class Tooltip extends Component {
    shouldComponentUpdate(nextProps, nextState)
    {
        return this.props.children !== nextProps.children;
    }

    render()
    {
        return (
            <div className="component-tooltip">
                <i className="fa fa-info-circle component-tooltipicon"></i>
                <span className="component-tooltiptext">
                    {this.props.children}
                </span>
            </div>
        );
    }
}

export default Tooltip;