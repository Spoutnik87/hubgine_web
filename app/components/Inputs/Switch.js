import React, { Component } from "react";
import PropTypes from "prop-types";

class Switch extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        values: PropTypes.array.isRequired,
        defaultOption: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            selectedOption: this.props.defaultOption
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            selectedOption: event.target.value
        });
        this.props.onChange({
            name: this.props.name,
            value: event.target.value
        });
    }

    render()
    {
        return (
            <div className="switch">
                {
                    this.props.values.map((value, index) => (
                        [
                            <input type="radio" id={index} name={this.props.name} value={value} onChange={this.handleChange} checked={this.state.selectedOption === value} />,
                            <label htmlFor={index}>{value}</label>
                        ]
                    ))
                }
            </div>
        );
    }
}

export default Switch;