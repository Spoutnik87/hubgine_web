import React, { Component } from "react";
import PropTypes from "prop-types";

class ToolTip extends Component {
    shouldComponentUpdate(nextProps, nextState)
    {
        return false;
    }

    render()
    {
        return (
            <div className="component-tooltip">
                <i className="fa fa-info-circle" style={{ fontSize: "1.5em", lineHeight: "2em" }}></i>
                <span className="component-tooltiptext">
                    {this.props.children}
                </span>
            </div>
        );
    }
}

export default ToolTip;