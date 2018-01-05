import React, { Component } from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import moment from "moment";
import { withLanguage } from "../withLanguage";
require('moment/locale/fr');

class DateInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.number
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
            REACT_DATETIME_LANGUAGE
        } = this.props.lang;
        const valid = (current) => {
            return current.isAfter(this.state.yesterday) && current.isBefore(this.state.nextYear);
        };
        return (
            <Datetime locale={REACT_DATETIME_LANGUAGE} isValidDate={valid} onChange={this.handleChange} value={this.props.value ? new Date(this.props.value*1000) : ""}/>
        );
    }
}

export default withLanguage(DateInput);