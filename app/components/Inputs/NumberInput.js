import React, { Component } from "react";
import PropTypes from "prop-types";

class NumberInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.number,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "numberinput",
        value: 0,
        onChange: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            value: Number.isInteger(this.props.value) ? this.props.value : 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    isNumeric(value)
    {
        if (value.match("^[0-9]*$"))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    handleChange(event)
    {
        if (this.isNumeric(event.target.value))
        {
            const value = event.target.value === "" ? 0 : parseInt(event.target.value);
            this.setState({
                value: value
            });
            this.props.onChange({
                name: this.props.name,
                value: value
            });
        }
    }

    handleClick(event)
    {
        let value = this.state.value === "" ? 0 : parseInt(this.state.value);
        if (event.target.id === "buttonDecrement")
        {
            if (value > 0) value--;
        }
        else if (event.target.id === "buttonIncrement")
        {
            value++;
        }
        this.setState({
            value: value.toString()
        });
    }

    render()
    {
        return (
            <div className="input-group">
                <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} autoFocus/>
                <span id="buttonDecrement" className="input-group-addon numberinput-button" onClick={this.handleClick}><i id="buttonDecrement" className="fa fa-minus fa-fw"></i></span>
                <span id="buttonIncrement" className="input-group-addon numberinput-button" onClick={this.handleClick}><i id="buttonIncrement" className="fa fa-plus fa-fw"></i></span>
            </div>
        );
    }
}

export default NumberInput;