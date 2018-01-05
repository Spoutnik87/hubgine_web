import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "input",
        value: "",
        type: "text",
        onChange: () => {}
    };

    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.props.onChange({
            name: this.props.name,
            value: event.target.value
        });
    }

    render()
    {
        return (
            <input {...this.props} onChange={this.handleChange}/>
        );
    }
}

export default Input;