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
        defaultIndex: PropTypes.number,
        onClick: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        customKeys: PropTypes.bool
    };

    static defaultProps = {
        defaultIndex: 0,
        customKeys: false
    };

    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.customKeys ? this.props.options[this.props.defaultIndex].value : this.props.options[this.props.defaultIndex]
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
        this.props.onChange(event);
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