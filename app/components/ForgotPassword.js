import React, { Component } from "react";
import PropTypes from "prop-types";
import UserForgotPasswordForm from "./Forms/UserForgotPasswordForm";
import { withMessages } from "./withMessages";
import Container from "./Container";
import Card from "./Card";

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
        const {
            email
        } = event.result;
    }
    
    render()
    {
        return (
            <Container>
                <Card>
                    <UserForgotPasswordForm onSubmit={this.handleSubmit} loading={this.state.loading} messages={this.props.messages} />
                </Card>
            </Container>
        );
    }
}

export default withMessages(ForgotPassword);