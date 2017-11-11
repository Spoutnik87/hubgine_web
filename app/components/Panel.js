import React, { Component } from "react";
import PropTypes from "prop-types";

class Panel extends Component {
    static propTypes = {
        title: PropTypes.any,
        children: PropTypes.any
    };

    static defaultProps = {
        title: null,
        children: null
    };
    
    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.title !== this.props.title || nextProps.children !== this.props.children;
    }

    render()
    {
        const {
            title,
            children
        } = this.props;
        const panelHeader = this.props.title !== null && (
            <div className="panel-heading">
                <h3 className="panel-title">{title}</h3>
            </div>
        );
        return (
            <div className="panel">
                {panelHeader}
                <div className="panel-body">
                    {children}
                </div>
            </div>
        );
    }
}

export default Panel;