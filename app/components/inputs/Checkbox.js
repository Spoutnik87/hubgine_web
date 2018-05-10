import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import FormGroup from "../FormGroup";
import Row from "../Row";
import Tooltip from "../Tooltip";

class Checkbox extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.bool,
        label: PropTypes.string,
        id: PropTypes.string,
        tooltip: PropTypes.string,
        onChange: PropTypes.func,
        autoFocus: PropTypes.bool,
        disabled: PropTypes.bool
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
        const { id, name, label, tooltip, autoFocus, disabled } = this.props;
        const { value } = this.state;
        const checkbox = (
            <div className="component-checkbox">
                <Input type="checkbox" name={name} id="checkbox" onChange={this.handleChange} checked={value} autoFocus={autoFocus} disabled={disabled}/>
                <label htmlFor="checkbox"></label>
            </div>
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
                    <div id={id} className="col-xs-12 col-sm-9 col-md-10">
                        {checkbox}
                    </div>
                </Row>
            </FormGroup>
        ) : (
            checkbox
        );
    }
}

export default Checkbox;