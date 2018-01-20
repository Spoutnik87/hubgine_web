import React, { Component } from "react";
import PropTypes from "prop-types";
import v4 from "uuid/v4";
import LoadingCog from "../LoadingCog";

class ListInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        defaultOption: PropTypes.string,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "listinput",
        disabled: false,
        loading: false,
        onClick: () => {},
        onChange: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            options: this.props.options.map(option => ({
                key: v4(),
                value: option
            })),
            value: this.props.defaultOption || this.props.options[0]
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentWillReceiveProps(nextProps)
    {
        if (nextProps.options != null && this.state.options !== nextProps.options)
        {
            this.setState({
                options: nextProps.options.map(option => ({
                    key: v4(),
                    value: option
                }))
            });
        }
        if (nextProps.value != null && this.state.value !== nextProps.value)
        {
            this.setState({
                value: nextProps.value
            });
        }
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
        return this.props.loading ? <LoadingCog /> : (
            <select name={this.props.name} className="form-control listinput" value={this.state.value} onClick={this.handleClick} onChange={this.handleChange} disabled={this.props.disabled}>
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