import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import validator from "validator";
import { connect as connectUser } from "../actions/user";
import { sendFailureMessage } from "../actions/messages";
import { connect as connectAPI } from "../util/api";
import Messages from "./Messages";
import LoadingCog from "./LoadingCog";
import { changeLanguage } from "../actions/lang";
import { clearMessages } from "../actions/messages";

class Signin extends Component {
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
        const messages = [];
        if (!validator.isEmail(this.state.email))
        {
            messages.push({ msg: this.props.lang.SIGNIN_EMAIL_INCORRECT });
        }
        if (!validator.isLength(this.state.password, { min: 6 }))
        {
            messages.push({ msg: this.props.lang.SIGNIN_PASSWORD_INCORRECT });
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
                    messages.push({ msg: this.props.lang.SIGNIN_CREDENTIALS_INCORRECT });
                    this.props.dispatch(sendFailureMessage(messages));
                    this.setState({ loading: false });
                }
            });
        }
        else
        {
            this.props.dispatch(sendFailureMessage(messages));
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
        const loadingDisplay = !this.state.loading ? <button type="submit" className="btn btn-success">{this.props.lang.SIGNIN_SUBMIT}</button> : <LoadingCog/>;
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.lang.SIGNIN_TITLE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">{this.props.lang.SIGNIN_EMAIL}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-2">{this.props.lang.SIGNIN_PASSWORD}</label>
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
                        <Link to="/forgot-password">{this.props.lang.SIGNIN_FORGOTPASSWORD}</Link>
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