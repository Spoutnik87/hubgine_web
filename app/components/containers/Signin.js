import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Container from "../Container";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import { connect as signin } from "../../actions/user";
import UserSigninForm from "../forms/UserSigninForm";

class Signin extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        lang: PropTypes.shape({
            SIGNIN_FORGOTPASSWORD: PropTypes.string.isRequired
        }).isRequired
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
            password
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.signin(email, password).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    render()
    {
        const {
            SIGNIN_FORGOTPASSWORD
        } = this.props.lang;
        const {
            messages
        } = this.props;
        const {
            loading
        } = this.state;
        return (
            <Container>
                <UserSigninForm onSubmit={this.handleSubmit} loading={loading} messages={messages} clientSide={true}>
                    <Link to="/forgot-password">{SIGNIN_FORGOTPASSWORD}</Link>
                </UserSigninForm>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            signin
        }, dispatch)
    };
};

export default withProps(connect(undefined, mapDispatchToProps)(Signin), [ Props.LANG, Props.MESSAGES ]);