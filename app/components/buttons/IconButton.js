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
        const {
            id,
            className,
            onClick,
            icon
        } = this.props;
        return (
            <span id={id} className={className} onClick={onClick}><i className={icon} id={id}></i></span>
        );
    }
}

export default IconButton;