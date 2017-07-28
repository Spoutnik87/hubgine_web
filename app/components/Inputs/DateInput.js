import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Datetime from "react-datetime";
import moment from "moment";
require("moment/locale/fr");

class DateInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func
    };

    defaultProps = {
        onChange: () => {}
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
            value: moment(datetime).format("X")
        });
    }

    render()
    {
        const valid = (current) => {
            return current.isAfter(this.state.yesterday) && current.isBefore(this.state.nextYear);
        };
        return (
            <Datetime locale={this.props.lang.REACT_DATETIME_LANGUAGE} isValidDate={valid} onChange={this.handleChange}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(DateInput);