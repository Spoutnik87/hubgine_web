import React, { Component } from "react";
import validator from "validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendFailureMessage, sendSuccessMessage, clearMessages } from "../actions/messages";
import Messages from "./Messages";

class ForgotPassword extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        lang: PropTypes.shape({
            FORGOTPASSWORD_TITLE: PropTypes.string.isRequired,
            FORGOTPASSWORD_SUBMIT: PropTypes.string.isRequired,
            FORGOTPASSWORD_EMAIL: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            email: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.setState({ loading: true });
        const messages = [];
        if (!validator.isEmail(this.state.email))
        {
            messages.push({ msg: "Email is not valid." });
        }
        if (messages.length === 0)
        {
            resetPassword(this.state.email, (error, result) =>
            {
                if (!error)
                {
                    messages.push({ msg: "An email was send." });
                    this.props.dispatch(sendSuccessMessage(messages));                    
                }
                else
                {
                    messages.push({ msg: "An error append during the subscription." });
                    this.props.dispatch(sendFailureMessage(messages));
                }
                this.setState({ loading: false });
            });
        }
        else
        {
            this.props.dispatch(sendFailureMessage(messages));
            this.setState({ loading: false });
        }
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentWillUnmount()
    {
        this.props.dispatch(clearMessages());
    }
    
    render()
    {
        const { FORGOTPASSWORD_TITLE, FORGOTPASSWORD_EMAIL, FORGOTPASSWORD_SUBMIT } = this.props.lang;
        const loadingDisplay = this.state.loading ? <i className="fa fa-cog fa-spin fa-3x fa-fw"></i> : <button type="submit" className="btn btn-success">{FORGOTPASSWORD_SUBMIT}</button>;
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{FORGOTPASSWORD_TITLE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">{FORGOTPASSWORD_EMAIL}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-8">
                                    {loadingDisplay}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        lang: state.lang
    };
};

export default connect(mapStateToProps)(ForgotPassword);