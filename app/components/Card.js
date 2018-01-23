import React, { Component } from "react";
import PropTypes from "prop-types";

class Card extends Component {
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
        const header = this.props.title !== null && (
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
        );
        return (
            <div className="card">
                {header}
                <div className="card-body">
                    {children}
                </div>
            </div>
        );
    }
}

export default Card;