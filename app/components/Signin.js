import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { connect as connectUser } from '../actions/user';
import { sendFailureMessage } from '../actions/signin';
import cookie from 'react-cookie';
import { connect as connectAPI } from '../util/api';
import Messages from './Messages';
import validator from 'validator';

class Signin extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { loading: false, email: "", password: "" };
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
            messages.push({ msg: "Email is not valid." });
        }
        if (!validator.isLength(this.state.password, { min: 6 }))
        {
            messages.push({ msg: "Password length must be at least 6 characters." });
        }
        if (messages.length == 0)
        {
            connectAPI(this.state.email, this.state.password, (error, result) =>
            {
                if (!error)
                {
                    this.props.dispatch(connectUser(result.token, result.email, "ADMIN"));
                    cookie.save('user', { "token": result.token, "email": result.email, "rank":"ADMIN" });
                    this.props.router.push("/");
                }
                else
                {
                    messages.push({ msg: "Your credentials are incorrect. Please try again or reset your password." });
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
        const loadingDisplay = this.state.loading ? <i className="fa fa-cog fa-spin fa-3x fa-fw"></i> : <button type="submit" className="btn btn-success">Sign In</button>;
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Sign In</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
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
                                <div className="col-sm-offset-2 col-sm-8">
                                    {loadingDisplay}
                                </div>
                            </div>
                        </form>
                        <Link to="/forgot-password">Forgot password?</Link>
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

export default connect(mapStateToProps)(Signin);