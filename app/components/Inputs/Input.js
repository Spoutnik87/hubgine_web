import React, { Component } from "react";
import PropTypes from "prop-types";
import FormGroup from "../FormGroup";
import Row from "../Row";
import Tooltip from "../Tooltip";

class Input extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        id: PropTypes.string,
        type: PropTypes.string,
        label: PropTypes.string,
        tooltip: PropTypes.string,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        name: "input",
        value: "",
        id: "input",
        type: "text",
        onChange: () => {}
    };

    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.props.onChange({
            name: this.props.name,
            value: event.target.value
        });
    }

    render()
    {
        const {
            id,
            name,
            label,
            tooltip,
            value,
            ...props
        } = this.props;
        const input = <input {...props} id={id} name={name} value={value} className="form-control" onChange={this.handleChange}/>
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
                        {input}
                    </div>    
                </Row>
            </FormGroup>
        ) : (
            input
        );
    }
}

export default Input;