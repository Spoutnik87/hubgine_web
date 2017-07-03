import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";
import { isValidEmail, isValidPassword } from "validator";
import { connect as connectUser } from "../actions/user";
import { sendFailureMessages, clearMessages } from "../actions/messages";
import { changeLanguage } from "../actions/lang";
import { connect as connectAPI } from "../util/api";
import Messages from "./Messages";
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
            loading: false, 
            email: "", 
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.setState({ loading: true });
        const { SIGNIN_EMAIL_INCORRECT, SIGNIN_PASSWORD_INCORRECT, SIGNIN_CREDENTIALS_INCORRECT } = this.props.lang;
        const messages = [];
        if (!isValidEmail(this.state.email))
        {
            messages.push(SIGNIN_EMAIL_INCORRECT);
        }
        if (!isValidPassword(this.state.password))
        {
            messages.push(SIGNIN_PASSWORD_INCORRECT);
        }
        if (messages.length == 0)
        {
            let email = this.state.email;
            connectAPI(this.state.email, this.state.password, (error, result) =>
            {
                if (!error)
                {
                    this.props.dispatch(connectUser(result.token, email, result.rank, result.lang));
                    if (this.props.lang.LANG !== result.lang)
                    {
                        this.props.dispatch(changeLanguage(result.lang));
                    }
                    this.props.cookies.set("user", { "token": result.token, "email": email, "rank": result.rank, lang: result.lang });
                    this.props.history.push("/");
                }
                else
                {
                    messages.push(SIGNIN_CREDENTIALS_INCORRECT);
                    this.props.dispatch(sendFailureMessages(messages));
                    this.setState({ loading: false });
                }
            });
        }
        else
        {
            this.props.dispatch(sendFailureMessages(messages));
            this.setState({ loading: false });
        }
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    componentWillUnmount()
    {
        this.props.dispatch(clearMessages());
    }

    render()
    {
        const { SIGNIN_TITLE, SIGNIN_EMAIL, SIGNIN_PASSWORD, SIGNIN_FORGOTPASSWORD, SIGNIN_SUBMIT } = this.props.lang;
        const loadingDisplay = !this.state.loading ? <button type="submit" className="btn btn-success">{SIGNIN_SUBMIT}</button> : <LoadingCog/>;
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{SIGNIN_TITLE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">{SIGNIN_EMAIL}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-2">{SIGNIN_PASSWORD}</label>
                                <div className="col-sm-8">
                                    <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-8">
                                    {loadingDisplay}
                                </div>
                            </div>
                        </form>
                        <Link to="/forgot-password">{SIGNIN_FORGOTPASSWORD}</Link>
                    </div>
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