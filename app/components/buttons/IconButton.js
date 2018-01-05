import React, { Component } from "react";
import PropTypes from "prop-types";

class IconButton extends Component {
    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        icon: PropTypes.string
    };

    static defaultProps = {
        id: "",
        className: "",
        onClick: () => {},
        icon: ""
    };

    render()
    {
        return (
            <span id={this.props.id} className={this.props.className} onClick={this.props.onClick}><i className={this.props.icon} id={this.props.id}></i></span>
        );
    }
}

export default IconButton;