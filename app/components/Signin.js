import React from 'react';

class Signin extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { email: "", password: "" };
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        console.log("Handle submit");
    }

    handleChange(event)
    {
        console.log("Handle change");
        console.log(event.target.name + " " + event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }
    
    render()
    {
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Sign in</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-2">Email</label>
                                <div className="col-sm-8">
                                    <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-2">Password</label>
                                <div className="col-sm-8">
                                    <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-8">
                                    <button type="submit" className="btn btn-success">Sign in</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;