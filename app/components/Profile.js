import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../util/api';
import { sendFailureMessage, sendSuccessMessage } from '../actions/profile';
import { updateUser } from '../util/api';
import { updateInfos, updateEmail } from '../actions/user';
import Messages from './Messages';
import validator from 'validator';
import AutoInputText from './AutoInputText';

class Profile extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false,
            editEmail: false,
            editFirstname: false,
            editLastname: false,
            loadingEmail: false,
            loadingFirstname: false,
            loadingLastname: false,
            last_email: "",
            last_firstname: "",
            last_lastname: "",
            email: "Loading...",
            firstname: "Loading...",
            lastname: "Loading..."
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onValidate = this.onValidate.bind(this);
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick(event)
    {
        if (this.state.isLoaded)
        {
            if (event.target.id == "buttonEmailEdit")
            {
                this.setState({ last_email: this.state.email, editEmail: true });
            }
            else if (event.target.id == "buttonFirstnameEdit")
            {
                this.setState({ last_firstname: this.state.firstname, editFirstname: true });
            }
            else if (event.target.id == "buttonLastnameEdit")
            {
                this.setState({ last_lastname: this.state.lastname, editLastname: true });
            }

            if (event.target.id == "buttonEmailCancel")
            {
                this.setState({ email: this.state.last_email, editEmail: false });
            }
            else if (event.target.id == "buttonFirstnameCancel")
            {
                this.setState({ first_name: this.state.last_firstname, editFirstname: false });
            }
            else if (event.target.id == "buttonLastnameCancel")
            {
                this.setState({ lastname: this.state.last_lastname, editLastname: false });
            }

            if (event.target.id == "buttonEmailValidate")
            {
                if (!validator.isEmpty(this.state.email) && validator.isEmail(this.state.email) && this.state.email != this.props.user.email)
                {
                    updateUser(this.props.user.email, this.props.user.token, "email", this.state.email, (error, result) => {
                        if (!error)
                        {
                            this.setState({ editEmail: !this.state.editEmail });
                            const messages = [{ msg: "You edited your email successfully." }];
                            this.props.dispatch(sendSuccessMessage(messages));
                            this.props.dispatch(updateEmail(this.state.email));
                        }
                        else
                        {
                            const messages = [{ msg: "Error." }];
                            this.props.dispatch(sendFailureMessage(messages));
                        }
                    });
                    
                }
                else
                {
                    const messages = [{ msg: "Email is not valid." }];
                    this.props.dispatch(sendFailureMessage(messages));
                }
            }
            else if (event.target.id == "buttonFirstnameValidate")
            {
                if (!validator.isEmpty(this.state.firstname))
                {
                    this.setState({ editFirstname: !this.state.editFirstname });
                    const messages = [{ msg: "You edited your first name successfully." }];
                    this.props.dispatch(sendSuccessMessage(messages));
                }
                else
                {
                    const messages = [{ msg: "First name field is empty." }];
                    this.props.dispatch(sendFailureMessage(messages));
                }
            }
            else if (event.target.id == "buttonLastnameValidate")
            {
                if (!validator.isEmpty(this.state.lastname))
                {
                    this.setState({ editLastname: !this.state.editLastname });
                    const messages = [{ msg: "You edited your last name successfully." }];
                    this.props.dispatch(sendSuccessMessage(messages));
                }
                else
                {
                    const messages = [{ msg: "Last name field is empty." }];
                    this.props.dispatch(sendFailureMessage(messages));
                }
            }
        }
    }

    componentDidMount() {
        getUser(this.props.user.email, this.props.user.token, (error, result) =>
        {
            if (!error)
            {
                this.setState({ isLoaded: true, email: result.email, firstname: result.first_name, lastname: result.last_name });
                this.props.dispatch(updateInfos(result.email, result.first_name, result.last_name));
            }
        });
    }

    onValidate(event)
    {
        this.setState({ loadingEmail: true });
        updateUser(this.props.user.email, this.props.user.token, "email", event.value, (error, result) => {
            this.setState({ loadingEmail: false });
            if (!error)
            {
                this.props.dispatch(updateEmail(event.value));
            }
        });
    }
    
    render()
    {
        if (this.state.isLoaded)
        {
            const styleEmail = !this.state.editEmail ? 
                <div className="input-group">
                    <div className="form-control">{this.props.user.email}</div>
                    <span id="buttonEmailEdit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonEmailEdit" className="fa fa-pencil fa-fw"></i></span>
                </div>
                :
                <div className="input-group">
                    <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                    <span id="buttonEmailValidate" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonEmailValidate" className="fa fa-check fa-fw"></i></span>
                    <span id="buttonEmailCancel" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonEmailCancel" className="fa fa-remove fa-fw"></i></span>
                </div>;
            
            const styleFirstname = !this.state.editFirstname ?
                <div className="input-group">
                    <div className="form-control">{this.state.firstname}</div>
                    <span id="buttonFirstnameEdit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonFirstnameEdit" className="fa fa-pencil fa-fw"></i></span>
                </div>
                :
                <div className="input-group">
                    <input type="text" name="firstname" id="firstname" className="form-control" value={this.state.firstname} onChange={this.handleChange} autoFocus/>
                    <span id="buttonFirstnameValidate" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonFirstnameValidate" className="fa fa-check fa-fw"></i></span>
                    <span id="buttonFirstnameCancel" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonFirstnameCancel" className="fa fa-remove fa-fw"></i></span>
                </div>;

            const styleLastname = !this.state.editLastname ?
                <div className="input-group">
                    <div className="form-control">{this.state.lastname}</div>
                    <span id="buttonLastnameEdit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonLastnameEdit" className="fa fa-pencil fa-fw"></i></span>
                </div>
                :
                <div className="input-group">
                    <input type="text" name="lastname" id="lastname" className="form-control" value={this.state.lastname} onChange={this.handleChange} autoFocus/>
                    <span id="buttonLastnameValidate" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonLastnameValidate" className="fa fa-check fa-fw"></i></span>
                    <span id="buttonLastnameCancel" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonLastnameCancel" className="fa fa-remove fa-fw"></i></span>
                </div>;
            
            const loadingEmailCog = this.state.loadingEmail ? <i className="fa fa-cog fa-spin fa-3x fa-fw"></i> : <AutoInputText name="email" value={this.props.user.email} onValidate={this.onValidate}/>;
            const loadingFirstnameCog = this.state.firstname ? <i className="fa fa-cog fa-spin fa-3x fa-fw"></i> : null;
            const loadingLastnameCog = this.state.lastname ? <i className="fa fa-cog fa-spin fa-3x fa-fw"></i> : null;

            return (
                <div className="container">
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">Profile</h3>
                        </div>
                        <div className="panel-body">
                            <Messages messages={this.props.messages}/>
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="email" className="col-sm-2">Email</label>
                                    <div className="col-sm-8">
                                        {styleEmail}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstname" className="col-sm-2">First name</label>
                                    <div className="col-sm-8">
                                        {styleFirstname}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname" className="col-sm-2">Last name</label>
                                    <div className="col-sm-8">
                                        {styleLastname}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname" className="col-sm-2">Last name</label>
                                    <div className="col-sm-8">
                                        {loadingEmailCog}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div className="container">
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">Profile</h3>
                        </div>
                        <div className="panel-body" style={ { textAlign: "center" } }>
                            <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Profile);