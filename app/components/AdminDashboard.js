import React, { Component } from "react";

class AdminDashboard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    render()
    {
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Reset password</h3>
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
                                <div className="col-sm-offset-2 col-sm-8">
                                    <button type="submit" className="btn btn-success">Reset password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;