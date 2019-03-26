import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register } from "../../actions/user";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import UserRegisterForm from "../forms/UserRegisterForm";
import Container from "../Container";

class Register extends Component {
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
            email,
            password,
            cpassword,
            firstname,
            lastname,
            lang,
            useterms,
            recaptcha
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.register(email, password, cpassword, firstname, lastname, lang, useterms, recaptcha).catch(error => {
            this.setState({
                loading: false
            });
        });
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
                <UserRegisterForm onSubmit={this.handleSubmit} loading={loading} messages={messages} clientSide={true}/>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            register
        }, dispatch)
    };
};

export default withProps(connect(undefined, mapDispatchToProps)(Register), [ Props.MESSAGES ]);
