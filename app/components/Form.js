import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

class Form extends Component {
    static propTypes = {
        title: PropTypes.string,
        children: PropTypes.any
    };

    static defaultProps = {
        title: undefined,
        children: undefined
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        const {
            title,
            children
        } = this.props;
        return nextProps.title !== title || nextProps.children !== children;
    }

    render()
    {
        const {
            title,
            children
        } = this.props;
        return (
            <Card title={title}>
                <div className="form-horizontal">{children}</div>
            </Card>
        );
    }
}

export default Form;