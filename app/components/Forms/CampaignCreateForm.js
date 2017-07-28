import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DateInput from "../Inputs/DateInput";
import Messages from "../Messages";

class CampaignCreateForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({

        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "campaigncreate",
        onSubmit: () => {},
        title: true,
        loading: false,
        messages: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
            name: "",
            dateBegin: "",
            dateEnd: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleClick(event)
    {
        this.props.onSubmit({
            name: this.props.name,
            result: {
                name: this.state.name,
                dateBegin: this.state.dateBegin,
                dateEnd: this.state.dateEnd
            }
        });
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
        const buttonSubmit = this.props.loading ? <LoadingCog/> : <button type="submit" className="btn btn-success" onClick={this.handleClick}>Submit</button>;
        const title = this.props.title ? <div className="panel-heading"><h3 className="panel-title">Create a campaign</h3></div> : undefined;
        const messages = this.props.messages ? <Messages messages={this.props.messages}/> : undefined;
        return (
            <div>
                {title}
                <div className="panel-body form-horizontal">
                    {messages}
                    <div className="form-group">
                        <label htmlFor="name" className="col-sm-2">Name</label>
                        <div className="col-sm-10">
                            <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.handleChange} autoFocus/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateBegin" className="col-sm-2">Date begin</label>
                        <div className="col-sm-10">
                            <DateInput id="dateBegin" name="dateBegin" onChange={this.handleDateChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateEnd" className="col-sm-2">Date end</label>
                        <div className="col-sm-10">
                            <DateInput id="dateEnd" name="dateEnd" onChange={this.handleDateChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            {buttonSubmit}
                        </div>
                    </div>
                    {this.props.children}
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