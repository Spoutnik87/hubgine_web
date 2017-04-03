import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../util/api';

class Profile extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { editEmail: false, editFirstname: false, editLastname: false, email: "", firstname: "", lastname: "" };
        /*getUser(this.props.user.email, this.props.user.token, (error, result) =>
        {
            if (!error)
            {
                this.state.email = result.email;
                this.state.firstname = result.firstname;
                this.state.lastname = result.lastname;
            }
            else console.log("error");
        });*/
        this.state.email = "vladkyry@gmail.com";
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick(event)
    {
        console.log(event.target.id);
        this.setState({ editEmail: !this.state.editEmail });
    }
    
    render()
    {
        const styleEmail = !this.state.editEmail ? 
            <div className="input-group">
                <div className="form-control">{this.state.email}</div>
                <span id="buttonEmail" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonEmail" className="fa fa-pencil fa-fw"></i></span>
            </div>
            : 
            <div className="input-group">
                <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                <span id="buttonEmail" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonEmail" className="fa fa-pencil fa-fw"></i></span>
            </div>;

        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Profile</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">Email</label>
                                <div className="col-sm-8">
                                    {styleEmail}
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Profile);