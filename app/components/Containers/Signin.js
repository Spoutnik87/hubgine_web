import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Container from "../Container";
import { withLanguage } from "../withLanguage";
import { withMessages } from "../withMessages";
import { connect as signin } from "../../actions/user";
import UserSigninForm from "../Forms/UserSigninForm";
import LoadingCog from "../LoadingCog";

class Signin extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        lang: PropTypes.shape({
            SIGNIN_EMAIL_INCORRECT: PropTypes.string.isRequired,
            SIGNIN_PASSWORD_INCORRECT: PropTypes.string.isRequired,
            SIGNIN_CREDENTIALS_INCORRECT: PropTypes.string.isRequired,
            SIGNIN_TITLE: PropTypes.string.isRequired,
            SIGNIN_EMAIL: PropTypes.string.isRequired,
            SIGNIN_PASSWORD: PropTypes.string.isRequired,
            SIGNIN_FORGOTPASSWORD: PropTypes.string.isRequired,
            SIGNIN_SUBMIT: PropTypes.string.isRequired
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
        return (
            <Container>
                <UserSigninForm onSubmit={this.handleSubmit} loading={this.state.loading} messages={this.props.messages}>
                    <Link to="/forgot-password">{SIGNIN_FORGOTPASSWORD}</Link>
                </UserSigninForm>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            signin
        }, dispatch)
    };
};

export default withMessages(withLanguage(connect(null, mapDispatchToProps)(Signin)));
