import React, { Component } from "react";
import PropTypes from "prop-types";
import v4 from "uuid/v4";
import { findIndex } from "lodash";
import LoadingCog from "../LoadingCog";
import FormGroup from "../FormGroup";
import Row from "../Row";
import Tooltip from "../Tooltip";

class ListInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        options: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.any),
            PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        }))]).isRequired,
        defaultOption: PropTypes.any,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        label: PropTypes.string,
        id: PropTypes.string,
        tooltip: PropTypes.string,
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
        const {
            options,
            defaultOption
        } = this.props;
        let selectedOption;
        if (defaultOption != null)
        {
            const optionsIndex = findIndex(options, { value: defaultOption });
            selectedOption = optionsIndex !== -1 ? options[optionsIndex].name || options[optionsIndex] : undefined;
        }
        else
        {
            selectedOption = options.length > 0 ? options[0].name || options[0] : undefined;
        }
        this.state = {
            options: this.props.options.map(option => ({
                key: v4(),
                name: option.name != null ? option.name : option,
                value: option.value != null ? option.value : option
            })),
            selectedOption: selectedOption
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
                    name: option.name != null ? option.name : option,
                    value: option.value != null ? option.value : option
                }))
            });
        }
    }

    handleClick(event)
    {
        this.props.onClick(event);
    }

    handleChange(event)
    {
        const {
            name
        } = this.props;
        const {
            options
        } = this.state;
        const optionsIndex = findIndex(options, { name: event.target.value });
        this.setState({
            selectedOption: event.target.value
        });
        this.props.onChange({
            name: name,
            value: optionsIndex !== -1 ? options[optionsIndex].value != null ? options[optionsIndex].value : options[optionsIndex] : undefined
        });
    }

    render()
    {
        const {
            id,
            name,
            disabled,
            loading,
            label,
            tooltip
        } = this.props;
        const {
            options,
            selectedOption
        } = this.state;
        const select = loading ? (
            <LoadingCog/>
        ) : (
            <select id={id} name={name} className="form-control listinput" value={selectedOption} onClick={this.handleClick} onChange={this.handleChange} disabled={disabled}>
            {
                options.map(option => (
                    <option key={option.key} value={option.name}>{option.name}</option>
                ))
            }
            </select>
        );
        return label ? (
            <FormGroup>
                <Row>
                    <label htmlFor={id} className="col-xs-12 col-sm-3 col-md-2">
                        {label}
                        {
                            tooltip && (
                                <span className="right-align">
                                    <Tooltip>
                                        {tooltip}
                                    </Tooltip>
                                </span>
                            )
                        }
                    </label>
                    <div className="col-xs-12 col-sm-9 col-md-10">
                        {select}
                    </div>
                </Row>
            </FormGroup>
        ) : (
            select
        );
    }
}

export default ListInput;