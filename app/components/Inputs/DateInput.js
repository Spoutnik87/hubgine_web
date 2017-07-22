import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Datetime from "react-datetime";
import moment from "moment";
require("moment/locale/fr");

class DateInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            value: "",
            values: []
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
        const yesterday = Datetime.moment().subtract(1, "day");
        const nextYear = Datetime.moment().add(1, "year");
        const valid = (current) => {
            return current.isAfter(yesterday) && current.isBefore(nextYear);
        };
        return (
            <div>
                <Datetime locale={this.props.lang.REACT_DATETIME_LANGUAGE} isValidDate={valid} onChange={this.handleChange}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(DateInput);