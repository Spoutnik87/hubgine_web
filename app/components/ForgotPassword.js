import React, { Component } from "react";
import PropTypes from "prop-types";
import UserForgotPasswordForm from "./Forms/UserForgotPasswordForm";
import { withMessages } from "./withMessages";

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
        const {
            email
        } = event.result;
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

export default withMessages(ForgotPassword);