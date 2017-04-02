import React from 'react';
import { connect } from 'react-redux';
import { connect as connectUser } from '../actions/user';
import cookie from 'react-cookie';
import { addUser } from '../util/api';
import { sendFailureMessage } from '../actions/register';
import Messages from './Messages';
import validator from 'validator';

class Register extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { loading: false, firstname: "", lastname: "", email: "", password: "", cpassword: "", useterms: false };
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
            messages.push({ msg: "First name field cannot be empty." });
        }
        if (validator.isEmpty(this.state.lastname))
        {
            messages.push({ msg: "Last name field cannot be empty." });
        }
        if (!validator.isEmail(this.state.email))
        {
            messages.push({ msg: "Email is not valid." });
        }
        if (!validator.isLength(this.state.password, { min: 6 }))
        {
            messages.push({ msg: "Password length must be at least 6 characters." });
        }
        if (!validator.equals(this.state.password, this.state.cpassword))
        {
            messages.push({ msg: "Your password doesn't match." });
        }
        if (!this.state.useterms)
        {
            messages.push({ msg: "You need to accept the terms of use." });
        }
        if (messages.length == 0)
        {
            addUser(this.state.email, this.state.password, this.state.firstname, this.state.lastname, (error, result) =>
            {
                if (!error)
                {
                    this.props.dispatch(connectUser(result.token, "ADMIN"));
                    cookie.save('user', { "token": result.token,"rank":"ADMIN" });
                    this.props.router.push("/");
                }
                else
                {
                    messages.push({ msg: "An error append during the subscription." });
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
    
    render()
    {
        const loadingDisplay = this.state.loading ? <i className="fa fa-cog fa-spin fa-3x fa-fw"></i> : <button type="submit" className="btn btn-success">Register</button>;
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="firstname" className="col-sm-2">First name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="firstname" id="firstname" className="form-control" value={this.state.firstname} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname" className="col-sm-2">Last name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="lastname" id="lastname" className="form-control" value={this.state.lastname} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">Email</label>
                                <div className="col-sm-8">
                                    <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-2">Password</label>
                                <div className="col-sm-8">
                                    <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword" className="col-sm-2">Confirm password</label>
                                <div className="col-sm-8">
                                    <input type="password" name="cpassword" id="cpassword" className="form-control" value={this.state.cpassword} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="useterms" className="col-sm-2">Accept use terms</label>
                                <div className="col-sm-8 form-checkbox">
                                    <input type="checkbox" name="useterms" id="useterms" value={this.state.useterms} onChange={this.handleChange} autoFocus/>
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
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Register);