import React, { Component } from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import moment from "moment";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import FormGroup from "../FormGroup";
import Row from "../Row";
import Tooltip from "../Tooltip";
import Input from "./Input";

class DateInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.number,
        id: PropTypes.string,
        tooltip: PropTypes.string,
        label: PropTypes.string,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        name: "dateinput",
        onChange: () => {},
        value: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
            yesterday: Datetime.moment().subtract(1, "day"),
            nextYear: Datetime.moment().add(1, "year")
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(datetime)
    {
        this.props.onChange({
            name: this.props.name,
            value: moment(datetime).unix()
        });
    }

    render()
    {
        const {
            id,
            label,
            value,
            tooltip,
            disabled
        } = this.props;
        const { yesterday, nextYear } = this.state;
        const valid = (current) => {
            return current.isAfter(yesterday) && current.isBefore(nextYear);
        };
        const dateInput = !disabled ? (
            <Datetime isValidDate={valid} onChange={this.handleChange} value={value ? new Date(value*1000) : ""}/>
        ) : (
            <Input value={moment(value*1000).toDate().toLocaleString()} disabled/>
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
                        {dateInput}
                    </div>
                </Row>
            </FormGroup>
        ) : (
            dateInput
        );
    }
}

export default withProps(DateInput, [ Props.LANG ]);