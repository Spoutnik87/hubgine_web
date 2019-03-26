import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import FormGroup from "../FormGroup";
import Row from "../Row";
import Tooltip from "../Tooltip";

class ConditionalInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        condition: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
        id: PropTypes.string,
        label: PropTypes.string,
        tooltip: PropTypes.string,
        onChange: PropTypes.func,
        type: PropTypes.string,
        className: PropTypes.string,
        autoFocus: PropTypes.bool,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        name: "conditionalinput",
        value: "",
        onChange: () => {},
        type: "text"
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
        const {
            name,
            condition,
            onChange
        } = this.props;
        const {
            value
        } = event;
        if ((typeof condition === "function" && condition(value)) || (typeof condition === "string" && value.match(condition)))
        {
            this.setState({
                value: value
            });
            onChange({
                name: name,
                value: value
            });
        }
    }

    render()
    {
        const { label, tooltip, ...props } = this.props;
        const { value } = this.state;
        const conditionalInput = <Input {...props} value={value} onChange={this.handleChange}/>;
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
                        {conditionalInput}
                    </div>
                </Row>
            </FormGroup>
        ) : (
            conditionalInput
        );
    }
}

export default ConditionalInput;