import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import IconButton from "../buttons/IconButton";

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
        if (this.isNumeric(event.value))
        {
            const value = event.value === "" ? 0 : parseInt(event.value);
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
                <Input className="form-control" value={this.state.value} onChange={this.handleChange} autoFocus />
                <IconButton id="buttonDecrement" className="input-group-addon numberinput-button" icon="fa fa-minus fa-fw" onClick={this.handleClick} />
                <IconButton id="buttonIncrement" className="input-group-addon numberinput-button" icon="fa fa-plus fa-fw" onClick={this.handleClick} />
            </div>
        );
    }
}

export default NumberInput;