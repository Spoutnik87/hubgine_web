import React, { Component } from "react";
import PropTypes from "prop-types";

class Container extends Component {
    static propTypes = {
        children: PropTypes.any,
        center: PropTypes.bool
    };

    static defaultProps = {
        children: null,
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
            center
        } = this.props;
        return (
            <div className={"container" + (center ? " text-center" : "")}>
                {children}
            </div>
        );
    }
}

export default Container;