import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { clearMessages } from "../../actions/messages";
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
        const { email, password } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.signin(email, password).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    componentWillUnmount()
    {
        this.props.actions.clearMessages();
    }

    render()
    {
        const { SIGNIN_FORGOTPASSWORD } = this.props.lang;
        return (
            <div className="container">
                <div className="panel">
                    <UserSigninForm onSubmit={this.handleSubmit} loading={this.state.loading} messages={this.props.messages}>
                        <Link to="/forgot-password">{SIGNIN_FORGOTPASSWORD}</Link>
                    </UserSigninForm>
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

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            clearMessages,
            signin
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
