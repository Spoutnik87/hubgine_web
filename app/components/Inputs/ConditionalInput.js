import React, { Component } from "react";
import PropTypes from "prop-types";
import { type } from "os";

class ConditionalInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        condition: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
        onChange: PropTypes.func,
        type: PropTypes.string
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
        this.handleClick = this.handleClick.bind(this);
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
        } = event.target;
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
            <input type={type} className="form-control" value={this.state.value} onChange={this.handleChange} autoFocus/>
        );
    }
}

export default ConditionalInput;