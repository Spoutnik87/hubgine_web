import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import FormGroup from "../FormGroup";
import Row from "../Row";
import Tooltip from "../Tooltip";

class Switch extends Component {
    static propTypes = {
        name: PropTypes.string,
        options: PropTypes.array.isRequired,
        defaultOption: PropTypes.string,
        id: PropTypes.string,
        label: PropTypes.string,
        tooltip: PropTypes.string,
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
        const { id, label, tooltip, name } = this.props;
        const { selectedOption } = this.state;
        const switchInput = (
            <div className="switch">
                {
                    this.props.options.map((value, index) => (
                        <Fragment key={name + index}>
                            <Input type="radio" id={index} name={name} value={value} onChange={this.handleChange} checked={selectedOption === value} />
                            <label htmlFor={index}>{value}</label>
                        </Fragment>
                    ))
                }
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
                <div className="col-xs-12 col-sm-9 col-md-10">
                    {switchInput}
                </div>
            </Row>
        </FormGroup>
        ) : (
            switchInput
        )
    }
}

export default Switch;