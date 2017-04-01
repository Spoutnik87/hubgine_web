import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { connect as connectUser } from '../actions/user';
import cookie from 'react-cookie';

const botAPI = require('../util/api');

class Signin extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { email: "", password: "" };
        this.api = new botAPI();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.props.dispatch(connectUser("token", "ADMIN"));
        cookie.save('user', { "token":"token","rank":"ADMIN" });
        this.props.router.push("/");
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
        //this.props.session[event.target.name] = event.target.value;
    }
    
    render()
    {
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Sign In</h3>
                    </div>
                    <div className="panel-body">
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
                                    <button type="submit" className="btn btn-success">Sign In</button>
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

/*const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};*/

export default connect()(Signin);