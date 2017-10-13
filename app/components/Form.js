import React, { Component } from "react";
import PropTypes from "prop-types";
import Panel from "./Panel";

class Form extends Component {
    static propTypes = {
        title: PropTypes.string,
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
        return (
            <Panel title={title}>
                <div className="form-horizontal">
                    {children}
                </div>
            </Panel>
        );
    }
}

export default Form;