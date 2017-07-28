import React, { Component } from "react";
import { isValidEmail } from "validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendFailureMessages, sendSuccessMessages, clearMessages } from "../actions/messages";
import UserForgotPasswordForm from "./Forms/UserForgotPasswordForm";

class ForgotPassword extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        const messages = [];
        const { email } = event.result;
        if (!isValidEmail(email))
        {
            messages.push("Email is not valid.");
        }
        if (messages.length === 0)
        {
            this.setState({
                loading: true
            });
            resetPassword(email, (error, result) =>
            {
                if (!error)
                {
                    messages.push("An email was send.");
                    this.props.dispatch(sendSuccessMessages(messages));                    
                }
                else
                {
                    messages.push("An error append during the subscription.");
                    this.props.dispatch(sendFailureMessages(messages));
                }
                this.setState({
                    loading: false
                });
            });
        }
        else
        {
            this.props.dispatch(sendFailureMessages(messages));
        }
    }

    componentWillUnmount()
    {
        this.props.dispatch(clearMessages());
    }
    
    render()
    {
        return (
            <div className="container">
                <div className="panel">
                    <UserForgotPasswordForm onSubmit={this.handleSubmit} loading={this.state.loading} messages={this.props.messages} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(ForgotPassword);