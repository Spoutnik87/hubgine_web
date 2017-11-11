import React, { Component } from "react";
import PropTypes from "prop-types";

class ConditionalInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.number,
        condition: PropTypes.func.isRequired,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "conditionalinput",
        value: 0,
        onChange: () => {}
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
        if (this.props.condition(event.target.value))
        {
            this.setState({
                value: value
            });
            this.props.onChange({
                name: this.props.name,
                value: value
            });
        }
    }

    render()
    {
        return (
            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} autoFocus/>
        );
    }
}

export default ConditionalInput;