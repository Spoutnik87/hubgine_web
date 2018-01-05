import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";

class Checkbox extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "checkbox",
        value: false,
        onChange: () => {}
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
        const value = !this.state.value;
        this.setState({
            value: value
        });
        this.props.onChange({
            name: this.props.name,
            value: value
        });
    }

    render()
    {
        return (
            <div className="component-checkbox">
                <Input type="checkbox" name={this.props.name} id="checkbox" onChange={this.handleChange} checked={this.state.value} />
                <label htmlFor="checkbox"></label>
            </div>
        );
    }
}

export default Checkbox;