import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import FormGroup from "../FormGroup";
import Row from "../Row";
import Tooltip from "../Tooltip";

class Switch extends Component {
    static propTypes = {
        name: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        })).isRequired,
        defaultOption: PropTypes.any,
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
            selectedOption: this.props.defaultOption || (this.props.options.length > 0 ? this.props.options[0].value : undefined)
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        const {
            name
        } = this.props;
        this.setState({
            selectedOption: event.value
        });
        this.props.onChange({
            name: name,
            value: event.value
        });
    }

    render()
    {
        const {
            id,
            label,
            tooltip,
            name,
            options
        } = this.props;
        const {
            selectedOption
        } = this.state;
        const switchInput = (
            <div className="switch">
                {
                    options.map((option, index) => (
                        <Fragment key={name + index}>
                            <Input type="radio" id={index} name={name} value={option.value} onChange={this.handleChange} checked={selectedOption === option.value} />
                            <label htmlFor={index}>{option.name}</label>
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