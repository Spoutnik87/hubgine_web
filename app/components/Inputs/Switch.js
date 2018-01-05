import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";

class Switch extends Component {
    static propTypes = {
        name: PropTypes.string,
        options: PropTypes.array.isRequired,
        defaultOption: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "switch",
        onChange: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            selectedOption: this.props.defaultOption || this.props.options[0]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            selectedOption: event.value
        });
        this.props.onChange({
            name: this.props.name,
            value: event.value
        });
    }

    render()
    {
        return (
            <div className="switch">
                {
                    this.props.options.map((value, index) => (
                        [
                            <Input key={"input" + index} type="radio" id={index} name={this.props.name} value={value} onChange={this.handleChange} checked={this.state.selectedOption === value} />,
                            <label key={"label" + index} htmlFor={index}>{value}</label>
                        ]
                    ))
                }
            </div>
        );
    }
}

export default Switch;