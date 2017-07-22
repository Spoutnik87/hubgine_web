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
import Messages from "./Messages";
import Checkbox from "./Inputs/Checkbox";
import LoadingCog from "./LoadingCog";

class Register extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        lang: PropTypes.shape({
            REGISTER_TITLE: PropTypes.string.isRequired,
            REGISTER_SUBMIT: PropTypes.string.isRequired,
            REGISTER_FIRSTNAME: PropTypes.string.isRequired,
            REGISTER_LASTNAME: PropTypes.string.isRequired,
            REGISTER_EMAIL: PropTypes.string.isRequired,
            REGISTER_PASSWORD: PropTypes.string.isRequired,
            REGISTER_CONFIRMPASSWORD: PropTypes.string.isRequired,
            REGISTER_USETERMS: PropTypes.string.isRequired,
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
            isLoaded: true,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword: "",
            useterms: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.setState({
            isLoaded: false
        });
        const { REGISTER_FIRSTNAME_INCORRECT, REGISTER_LASTNAME_INCORRECT, REGISTER_EMAIL_INCORRECT,
            REGISTER_PASSWORD_INCORRECT, REGISTER_PASSWORD_NOT_MATCH, REGISTER_USETERMS_INCORRECT, REGISTER_ERROR } = this.props.lang;
        const messages = [];
        if (!isValidFirstname(this.state.firstname))
        {
            messages.push(REGISTER_FIRSTNAME_INCORRECT);
        }
        if (!isValidLastname(this.state.lastname))
        {
            messages.push(REGISTER_LASTNAME_INCORRECT);
        }
        if (!isValidEmail(this.state.email))
        {
            messages.push(REGISTER_EMAIL_INCORRECT);
        }
        if (!isValidPassword(this.state.password))
        {
            messages.push(REGISTER_PASSWORD_INCORRECT);
        }
        if (!(this.state.password.length === this.state.cpassword.length))
        {
            messages.push(REGISTER_PASSWORD_NOT_MATCH);
        }
        if (!this.state.useterms)
        {
            messages.push(REGISTER_USETERMS_INCORRECT);
        }
        if (messages.length === 0)
        {
            const email = this.state.email;
            addUser(email, this.state.password, this.state.firstname, this.state.lastname, ENGLISH, (error, result) => {
                if (!error)
                {
                    this.props.dispatch(connectUser(result.token, email, result.rank, result.lang));
                    if (this.props.lang.LANG !== result.lang)
                    {
                        this.props.dispatch(changeLanguage(result.lang));
                    }
                    this.props.cookies.set("user", { token: result.token, email: email, rank: result.rank, lang: result.lang });
                    this.props.history.push("/");
                }
                else
                {
                    messages.push(REGISTER_ERROR);
                    this.props.dispatch(sendFailureMessages(messages));
                    this.setState({
                        isLoaded: true
                    });
                }
            });
        }
        else
        {
            this.props.dispatch(sendFailureMessages(messages));
            this.setState({
                isLoaded: true
            });
        }
    }

    handleChange(event)
    {
        if (event.target.type === "checkbox")
        {
            this.setState({
                [event.target.name]: event.target.checked
            });
        }
        else
        {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    componentWillUnmount()
    {
        this.props.dispatch(clearMessages());
    }
    
    render()
    {
        const { REGISTER_SUBMIT, REGISTER_TITLE, REGISTER_FIRSTNAME, REGISTER_LASTNAME, REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_CONFIRMPASSWORD, REGISTER_USETERMS } = this.props.lang;
        const loadingDisplay = this.state.isLoaded ? <button type="submit" className="btn btn-success">{REGISTER_SUBMIT}</button> : <LoadingCog/>;
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{REGISTER_TITLE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="firstname" className="col-sm-2">{REGISTER_FIRSTNAME}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="firstname" id="firstname" className="form-control" value={this.state.firstname} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname" className="col-sm-2">{REGISTER_LASTNAME}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="lastname" id="lastname" className="form-control" value={this.state.lastname} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">{REGISTER_EMAIL}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-2">{REGISTER_PASSWORD}</label>
                                <div className="col-sm-8">
                                    <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword" className="col-sm-2">{REGISTER_CONFIRMPASSWORD}</label>
                                <div className="col-sm-8">
                                    <input type="password" name="cpassword" id="cpassword" className="form-control" value={this.state.cpassword} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="useterms" className="col-sm-2">{REGISTER_USETERMS}</label>
                                <div className="col-sm-8">
                                    <Checkbox name="useterms" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-8">
                                    {loadingDisplay}
                                </div>
                            </div>
                        </form>
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

export default withRouter(withCookies(connect(mapStateToProps)(Register)));