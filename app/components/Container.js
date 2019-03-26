import React, { Component } from "react";
import PropTypes from "prop-types";

class Container extends Component {
    static propTypes = {
        children: PropTypes.any,
        center: PropTypes.bool,
        fluid: PropTypes.bool
    };

    static defaultProps = {
        children: undefined,
        center: false
    };
    
    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.children !== this.props.children || nextProps.title !== this.props.title;
    }
    
    render()
    {
        const {
            children,
            center,
            fluid
        } = this.props;
        return (
            <div className={"container" + (fluid ? "-fluid " : "") + (center ? " text-center" : "")}>
                {children}
            </div>
        );
    }
}

export default Container;