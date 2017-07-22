import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DateInput from "../Inputs/DateInput";

class CampaignCreateForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({

        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            name: "",
            dateBegin: "",
            dateEnd: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDateChange(event)
    {
        this.setState({
            [event.name]: event.value
        });
    }

    render()
    {
        return (
            <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Create a campaign</h3>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <label htmlFor="name" className="col-sm-2">Name :</label>
                        <div className="col-sm-10">
                            <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.handleChange} autoFocus/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateBegin" className="col-sm-2">Date begin :</label>
                        <div className="col-sm-10">
                            <DateInput id="dateBegin" name="dateBegin" onChange={this.handleDateChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateEnd" className="col-sm-2">Date end :</label>
                        <div className="col-sm-10">
                            <DateInput id="dateEnd" name="dateEnd" onChange={this.handleDateChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(CampaignCreateForm);