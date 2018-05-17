import React, { Component } from "react";
import PropTypes from "prop-types";
import UserForgotPasswordForm from "../forms/UserForgotPasswordForm";
import { withData } from "../withData";
import * as Data from "../../constants/Data";
import Container from "../Container";
import Card from "../Card";

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
        const {
            messages
        } = this.props;
        const {
            loading
        } = this.state;
        return (
            <Container>
                <UserForgotPasswordForm onSubmit={this.handleSubmit} loading={loading} messages={messages} clientSide={true}/>
            </Container>
        );
    }
}

export default withData(ForgotPassword, [ Data.MESSAGES ]);