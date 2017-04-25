import React from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser, getAccountList } from '../util/api';
import { sendFailureMessage, sendSuccessMessage } from '../actions/profile';
import { updateInfos, updateEmail, updateFirstname, updateLastname } from '../actions/user';
import { updateAccountList } from '../actions/accounts';
import Messages from './Messages';
import { withCookies } from 'react-cookie';
import validator from 'validator';
import AutoInputText from './AutoInputText';
import LoadingCog from './LoadingCog';
import { ENGLISH } from '../languages/lang';

class Profile extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false,
            isAccountListLoaded: false,
            loadingEmail: false,
            loadingFirstname: false,
            loadingLastname: false,
        };
        this.onValidate = this.onValidate.bind(this);
    }

    componentDidMount() {
        getUser(this.props.user.email, this.props.user.token, (error, result) =>
        {
            if (!error)
            {
                this.setState({ isLoaded: true, email: result.email, firstname: result.first_name, lastname: result.last_name });
                this.props.dispatch(updateInfos(result.email, result.first_name, result.last_name));
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: "An error happened." }]));
            }
        });
        getAccountList(this.props.user.email, this.props.user.token, (error, result) => {
            if (!error)
            {
                this.setState({ isAccountListLoaded: true });
                this.props.dispatch(updateAccountList(result.accounts));
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: "An error happened during account list loading." }]));
            }
        });
    }

    onValidate(input)
    {
        if (input.name === "email")
        {
            if (validator.isEmail(input.value) && !validator.isEmpty(input.value))
            {
                if (input.value !== this.props.user.email)
                {
                    this.setState({ loadingEmail: true });
                    updateUser(this.props.user.email, this.props.user.token, "email", input.value, (error, result) => {
                        this.setState({ loadingEmail: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage([{ msg: "You edited your email successfully." }]));
                            this.props.dispatch(updateEmail(input.value));
                            this.props.cookies.set("user", { token: this.props.user.token, email: this.props.user.email, rank: this.props.user.rank, lang: ENGLISH });
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage([{ msg: "An error happened." }]));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: "Email is not valid." }]));
            }
        }
        else if (input.name === "firstname")
        {
            if (!validator.isEmpty(input.value))
            {
                if (input.value !== this.props.user.firstname)
                {
                    this.setState({ loadingFirstname: true });
                    updateUser(this.props.user.email, this.props.user.token, "first_name", input.value, (error, result) => {
                        this.setState({ loadingFirstname: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage([{ msg: "You edited your first name successfully." }]));
                            this.props.dispatch(updateFirstname(input.value));
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage([{ msg: "An error happened." }]));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: "The first name field cannot be empty." }]));
            }
        }
        else if (input.name === "lastname")
        {
            if (!validator.isEmpty(input.value))
            {
                if (input.value !== this.props.user.lastname)
                {
                    this.setState({ loadingLastname: true });
                    updateUser(this.props.user.email, this.props.user.token, "last_name", input.value, (error, result) => {
                        this.setState({ loadingLastname: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage([{ msg: "You edited your last name successfully." }]));
                            this.props.dispatch(updateLastname(input.value));
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage([{ msg: "An error happened." }]));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: "The last name field cannot be empty." }]));
            }
        }
    }

    render()
    {
        let panel;
        let accountList;
        if (this.state.isAccountListLoaded)
        {
            accountList = (
                <ul className="list-group">
                    {this.props.accounts.map(
                        (account, index) => (
                            <li key={index} className="list-group-item">{account.name}</li>   
                        )
                    )}
                </ul>
            );
        }
        if (this.state.isLoaded && this.state.isAccountListLoaded)
        {
            const emailInput = !this.state.loadingEmail ?
                <AutoInputText name="email" value={this.props.user.email} onValidate={this.onValidate}/> : <LoadingCog/>;
            const firstnameInput = !this.state.loadingFirstname ?
                <AutoInputText name="firstname" value={this.props.user.firstname} onValidate={this.onValidate}/> : <LoadingCog/>;
            const lastnameInput = !this.state.loadingLastname ?
                <AutoInputText name="lastname" value={this.props.user.lastname} onValidate={this.onValidate}/> : <LoadingCog/>;
            panel = (
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.lang.PROFILE_PROFILE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">{this.props.lang.PROFILE_EMAIL}</label>
                                <div className="col-sm-8">
                                    {emailInput}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname" className="col-sm-2">{this.props.lang.PROFILE_FIRSTNAME}</label>
                                <div className="col-sm-8">
                                    {firstnameInput}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname" className="col-sm-2">{this.props.lang.PROFILE_LASTNAME}</label>
                                <div className="col-sm-8">
                                    {lastnameInput}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.lang.PROFILE_ACCOUNT_LIST}</h3>
                    </div>
                    <div className="panel-body">
                        {accountList}
                    </div>
                </div>
            );
        }
        else
        {
            panel = (
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.lang.PROFILE_PROFILE}</h3>
                    </div>
                    <div className="panel-body" style={ { textAlign: "center" } }>
                        <Messages messages={this.props.messages}/>
                        <LoadingCog/>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                {panel}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
    lang: state.lang,
    accounts: state.accounts
  };
};

export default connect(mapStateToProps)(withCookies(Profile));