import React, { Component } from "react";
import PropTypes from "prop-types";

class ListInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        options: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            PropTypes.arrayOf(PropTypes.shape({
                key: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired
            })).isRequired
        ]),
        defaultOption: PropTypes.string,
        onClick: PropTypes.func,
        onChange: PropTypes.func,
        customKeys: PropTypes.bool
    };

    static defaultProps = {
        onClick: () => {},
        onChange: () => {},
        customKeys: false
    };

    constructor(props)
    {
        super(props);
        this.state = {
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
                    this.props.options.map((option, index) => (
                        this.props.customKeys ? <option key={option.key} value={option.value}>{option.value}</option> : <option key={index} value={option}>{option}</option>
                    ))
                }
            </select>
        );
    }
}

export default ListInput;