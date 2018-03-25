import React, { Component } from "react";
import PropTypes from "prop-types";

class Card extends Component {
    static propTypes = {
        title: PropTypes.any,
        children: PropTypes.any
    };

    static defaultProps = {
        title: null,
        titleRight: null,
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
            titleRight,
            children
        } = this.props;
        return (
            <div className="card">
                {
                    (title || titleRight) && (
                        <div className="card-header">
                            <h3 className="card-title">{title}{titleRight && (<span className="right-align">{titleRight}</span>)}</h3>
                        </div>
                    )
                }
                <div className="card-body">
                    {children}
                </div>
            </div>
        );
    }
}

export default Card;