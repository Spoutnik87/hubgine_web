import React, { Component } from "react";
import PropTypes from "prop-types";
import v4 from "uuid";

class ListInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        defaultOption: PropTypes.string,
        onClick: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "listinput",
        onClick: () => {},
        onChange: () => {},
        customKeys: false
    };

    constructor(props)
    {
        super(props);
        this.state = {
            options: this.props.options.map(option => ({
                key: v4(),
                value: option
            })),
            value: this.props.customKeys ? this.props.defaultOption.value : this.props.defaultOption
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event)
    {
        this.props.onClick(event);
    }

    handleChange(event)
    {
        this.setState({
            value: event.target.value
        });
        this.props.onChange({
            name: this.props.name,
            value: event.target.value
        });
    }

    render()
    {
        return (
            <select name={this.props.name} className="form-control" value={this.state.value} onClick={this.handleClick} onChange={this.handleChange}>
                {
                    this.state.options.map(option => (
                        <option key={option.key} value={option.value}>{option.value}</option>
                    ))
                }
            </select>
        );
    }
}

export default ListInput;