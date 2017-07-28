import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";
import { isValidEmail, isValidPassword, isValidFirstname, isValidLastname } from "validator";
import { addUser } from "../util/api";
import { connect as connectUser } from "../actions/user";
import { changeLanguage } from "../actions/lang";
import { sendFailureMessages, clearMessages } from "../actions/messages";
import { ENGLISH } from "../constants/Languages";
import UserRegisterForm from "./Forms/UserRegisterForm";
import LoadingCog from "./LoadingCog";

class Register extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        lang: PropTypes.shape({
            REGISTER_FIRSTNAME_INCORRECT: PropTypes.string.isRequired,
            REGISTER_LASTNAME_INCORRECT: PropTypes.string.isRequired,
            REGISTER_EMAIL_INCORRECT: PropTypes.string.isRequired,
            REGISTER_PASSWORD_INCORRECT: PropTypes.string.isRequired,
            REGISTER_PASSWORD_NOT_MATCH: PropTypes.string.isRequired,
            REGISTER_USETERMS_INCORRECT: PropTypes.string.isRequired,
            REGISTER_ERROR: PropTypes.string.isRequired
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
        const { REGISTER_FIRSTNAME_INCORRECT, REGISTER_LASTNAME_INCORRECT, REGISTER_EMAIL_INCORRECT,
            REGISTER_PASSWORD_INCORRECT, REGISTER_PASSWORD_NOT_MATCH, REGISTER_USETERMS_INCORRECT, REGISTER_ERROR } = this.props.lang;
        const { email, password, cpassword, firstname, lastname, useterms } = event.result;
        const messages = [];
        if (!isValidFirstname(firstname))
        {
            messages.push(REGISTER_FIRSTNAME_INCORRECT);
        }
        if (!isValidLastname(lastname))
        {
            messages.push(REGISTER_LASTNAME_INCORRECT);
        }
        if (!isValidEmail(email))
        {
            messages.push(REGISTER_EMAIL_INCORRECT);
        }
        if (!isValidPassword(password))
        {
            messages.push(REGISTER_PASSWORD_INCORRECT);
        }
        if (password !== cpassword)
        {
            messages.push(REGISTER_PASSWORD_NOT_MATCH);
        }
        if (!useterms)
        {
            messages.push(REGISTER_USETERMS_INCORRECT);
        }
        if (messages.length === 0)
        {
            this.setState({
                loading: true
            });
            addUser(email, password, firstname, lastname, ENGLISH, (error, result) => {
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
                    messages.push(REGISTER_ERROR);
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
        return (
            <div className="container">
                <div className="panel">
                    <UserRegisterForm onSubmit={this.handleSubmit} loading={this.state.loading} messages={this.props.messages} />
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

export default withRouter(withCookies(connect(mapStateToProps)(Register)));