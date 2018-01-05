import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";

class ConditionalInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        condition: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
        onChange: PropTypes.func,
        type: PropTypes.string,
        className: PropTypes.string
    };

    static defaultProps = {
        name: "conditionalinput",
        value: "",
        onChange: () => {},
        type: "text"
    };

    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        const {
            name,
            condition,
            onChange
        } = this.props;
        const {
            value
        } = event;
        if ((typeof condition === "function" && condition(value)) || (typeof condition === "string" && value.match(condition)))
        {
            this.setState({
                value: value
            });
            onChange({
                name: name,
                value: value
            });
        }
    }

    render()
    {
        return (
            <Input type={this.props.type} className={this.props.className} value={this.state.value} onChange={this.handleChange} autoFocus />
        );
    }
}

export default ConditionalInput;