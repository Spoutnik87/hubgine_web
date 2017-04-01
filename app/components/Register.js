import React from 'react';
const botAPI = require('../util/api');

class Register extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { email: "", password: "", cpassword: "", useterms: false };
        this.api = new botAPI();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    render()
    {
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register</h3>
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
                                    <button type="submit" className="btn btn-success">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;