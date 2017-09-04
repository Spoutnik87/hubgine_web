import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";
import { isValidEmail, isValidPassword } from "validator";
import { connect as connectUser } from "../actions/user";
import { sendFailureMessages, clearMessages } from "../actions/messages";
import { changeLanguage } from "../actions/lang";
import { connect as connectAPI } from "../net/Requests";
import UserSigninForm from "./Forms/UserSigninForm";
import LoadingCog from "./LoadingCog";

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
        const { SIGNIN_EMAIL_INCORRECT, SIGNIN_PASSWORD_INCORRECT, SIGNIN_CREDENTIALS_INCORRECT } = this.props.lang;
        const { email, password } = event.result;
        const messages = [];
        if (!isValidEmail(email))
        {
            messages.push(SIGNIN_EMAIL_INCORRECT);
        }
        if (!isValidPassword(password))
        {
            messages.push(SIGNIN_PASSWORD_INCORRECT);
        }
        if (messages.length === 0)
        {
            this.setState({
                loading: true
            });
            connectAPI(email, password, (error, result) =>
            {
                if (!error)
                {
                    this.props.dispatch(connectUser(result.token, email, result.rank, result.lang));
                    if (this.props.lang.LANG !== result.lang)
                    {
                        this.props.dispatch(changeLanguage(result.lang));
                    }
                    this.props.cookies.set("user", {
                        token: result.token,
                        email: email,
                        rank: result.rank,
                        lang: result.lang
                    });
                    this.props.history.push("/");
                }
                else
                {
                    messages.push(SIGNIN_CREDENTIALS_INCORRECT);
                    this.props.dispatch(sendFailureMessages(messages));
                    this.setState({
                        loading: false
                    });
                }
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

export default withRouter(withCookies(connect(mapStateToProps)(Signin)));