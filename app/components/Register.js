import React from 'react';
import { connect } from 'react-redux';
import { connect as connectUser } from '../actions/user';
import { withCookies } from 'react-cookie';
import { addUser } from '../util/api';
import { sendFailureMessage } from '../actions/register';
import Messages from './Messages';
import validator from 'validator';
import * as ranks from '../constants/Ranks';
import LoadingCog from './LoadingCog';
import { changeLanguage } from '../actions/lang';
import { ENGLISH } from '../languages/lang';

class Register extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            loading: false,
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
        this.setState({ loading: true });
        const messages = [];
        if (validator.isEmpty(this.state.firstname))
        {
            messages.push({ msg: this.props.lang.REGISTER_FIRSTNAME_INCORRECT });
        }
        if (validator.isEmpty(this.state.lastname))
        {
            messages.push({ msg: this.props.lang.REGISTER_LASTNAME_INCORRECT });
        }
        if (!validator.isEmail(this.state.email))
        {
            messages.push({ msg: this.props.lang.REGISTER_EMAIL_INCORRECT });
        }
        if (!validator.isLength(this.state.password, { min: 6 }))
        {
            messages.push({ msg: this.props.lang.REGISTER_PASSWORD_INCORRECT });
        }
        if (!validator.equals(this.state.password, this.state.cpassword))
        {
            messages.push({ msg: this.props.lang.REGISTER_PASSWORD_NOT_MATCH });
        }
        if (!this.state.useterms)
        {
            messages.push({ msg: this.props.lang.REGISTER_USETERMS_INCORRECT });
        }
        if (messages.length == 0)
        {
            let email = this.state.email;
            addUser(email, this.state.password, this.state.firstname, this.state.lastname, ENGLISH, (error, result) =>
            {
                if (!error)
                {
                    this.props.dispatch(connectUser(result.token, email, result.rank, result.lang));
                    if (this.props.lang.LANG !== result.lang)
                    {
                        this.props.dispatch(changeLanguage(result.lang));
                    }
                    this.props.cookies.set("user", { token: result.token, email: email, rank: result.rank, lang: result.lang });
                    this.props.router.push("/");
                }
                else
                {
                    messages.push({ msg: this.props.lang.REGISTER_ERROR });
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
        if (event.target.type === "checkbox")
        {
            this.setState({ [event.target.name]: event.target.checked });
        }
        else
        {
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    
    render()
    {
        const loadingDisplay = !this.state.loading ? <button type="submit" className="btn btn-success">{this.props.lang.REGISTER_SUBMIT}</button> : <LoadingCog/>;
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.lang.REGISTER_TITLE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="firstname" className="col-sm-2">{this.props.lang.REGISTER_FIRSTNAME}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="firstname" id="firstname" className="form-control" value={this.state.firstname} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname" className="col-sm-2">{this.props.lang.REGISTER_LASTNAME}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="lastname" id="lastname" className="form-control" value={this.state.lastname} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">{this.props.lang.REGISTER_EMAIL}</label>
                                <div className="col-sm-8">
                                    <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-2">{this.props.lang.REGISTER_PASSWORD}</label>
                                <div className="col-sm-8">
                                    <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword" className="col-sm-2">{this.props.lang.REGISTER_CONFIRMPASSWORD}</label>
                                <div className="col-sm-8">
                                    <input type="password" name="cpassword" id="cpassword" className="form-control" value={this.state.cpassword} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="useterms" className="col-sm-2">{this.props.lang.REGISTER_USETERMS}</label>
                                <div className="col-sm-8 form-checkbox">
                                    <input type="checkbox" name="useterms" id="useterms" onChange={this.handleChange} autoFocus/>
                                    <label htmlFor="useterms" className="green-background"></label>
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

export default connect(mapStateToProps)(withCookies(Register));