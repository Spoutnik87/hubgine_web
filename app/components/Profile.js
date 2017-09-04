import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { isValidEmail, isValidFirstname, isValidLastname, isValidLanguage, isValidTwitterAccountName, isUniqueTwitterAccountName, 
    isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret, isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret } from "validator";
import PropTypes from "prop-types";
import { getUser, updateUser, getAccountList, getMaxAccounts, addAccount } from "../net/Requests";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage, clearMessages } from "../actions/messages";
import { updateInfos, updateMaxAccounts, updateEmail, updateFirstname, updateLastname, updateLanguage } from "../actions/user";
import { changeLanguage } from "../actions/lang";
import { updateAccountList, addAccount as addAccountToProps } from "../actions/accounts";
import * as Ranks from "../constants/Ranks";
import * as Languages from "../constants/Languages";
import Messages from "./Messages";
import TextInput from "./Inputs/TextInput";
import ListInput from "./Inputs/ListInput";
import TwitterAccountList from "./TwitterAccountList";
import TwitterAccountForm from "./Forms/TwitterAccountForm";
import LoadingCog from "./LoadingCog";

class Profile extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        accounts: PropTypes.shape({
            data: PropTypes.array.isRequired
        }).isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
            rank: PropTypes.oneOf(Object.values(Ranks)).isRequired,
            lang: PropTypes.oneOf(Object.values(Languages)).isRequired,
            firstname: PropTypes.string,
            lastname: PropTypes.string
        }).isRequired,
        lang: PropTypes.shape({
            PROFILE_TITLE: PropTypes.string.isRequired,
            PROFILE_ACCOUNT_LIST: PropTypes.string.isRequired,
            PROFILE_EMAIL: PropTypes.string.isRequired,
            PROFILE_FIRSTNAME: PropTypes.string.isRequired,
            PROFILE_LASTNAME: PropTypes.string.isRequired,
            PROFILE_LANGUAGE: PropTypes.string.isRequired,
            PROFILE_ERROR_GENERIC: PropTypes.string.isRequired,
            PROFILE_ERRORLOADING_USER: PropTypes.string.isRequired,
            PROFILE_ERRORLOADING_ACCOUNTLIST: PropTypes.string.isRequired,
            PROFILE_ERROREDITING_EMAIL: PropTypes.string.isRequired,
            PROFILE_SUCCESSEDITING_EMAIL: PropTypes.string.isRequired,
            PROFILE_ERROREDITING_FIRSTNAME: PropTypes.string.isRequired,
            PROFILE_SUCCESSEDITING_FIRSTNAME: PropTypes.string.isRequired,
            PROFILE_ERROREDITING_LASTNAME: PropTypes.string.isRequired,
            PROFILE_SUCCESSEDITING_LASTNAME: PropTypes.string.isRequired,
            PROFILE_ERROREDITING_LASTNAME: PropTypes.string.isRequired,
            PROFILE_SUCCESSEDITING_LASTNAME: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_NAME_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_NAME_NOT_UNIQUE: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_GENERIC_ERROR: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CREATE_SUCCESS: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loadingAccountForm: false,
            isLoaded: false,
            isAccountListLoaded: false,
            isMaxAccountsLoaded: false,
            isAccountCreationFormDisplayed: false,
            loadingEmail: false,
            loadingFirstname: false,
            loadingLastname: false,
            loadingLanguage: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAccountFormCreationCancel = this.handleAccountFormCreationCancel.bind(this);
        this.handleAccountFormCreationSubmit = this.handleAccountFormCreationSubmit.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    componentDidMount()
    {
        const { PROFILE_ERRORLOADING_USER, PROFILE_ERRORLOADING_ACCOUNTLIST } = this.props.lang;
        getUser(this.props.user.email, this.props.user.token, this.props.user, (error, result) => {
            if (!error)
            {
                if (result)
                {
                    this.props.dispatch(updateInfos(result.email, result.firstname, result.lastname));
                    this.setState({
                        isLoaded: true,
                        email: result.email,
                        firstname: result.firstname,
                        lastname: result.lastname
                    });
                }
                else
                {
                    this.setState({
                        isLoaded: true 
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage(PROFILE_ERRORLOADING_USER));
            }
        });
        getAccountList(this.props.user.email, this.props.user.token, this.props.accounts, (error, result) => {
            if (!error)
            {
                if (result)
                {
                    this.props.dispatch(updateAccountList(result.accounts.map(account => ({
                        name: account.name,
                        consumerKey: account.consumer_key,
                        consumerSecret: account.consumer_secret,
                        accessTokenKey: account.access_token_key,
                        accessTokenSecret: account.access_token_secret
                    }))));
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage(PROFILE_ERRORLOADING_ACCOUNTLIST));
            }
            this.setState({
                isAccountListLoaded: true
            });
        });
        getMaxAccounts(this.props.user.email, this.props.user.token, this.props.user, (error, result) => {
            if (!error)
            {
                if (result)
                {
                    this.props.dispatch(updateMaxAccounts(result.nbr));
                }
                this.setState({
                    isMaxAccountsLoaded: true
                });
            }
        });
    }

    componentWillUnmount()
    {
        this.props.dispatch(clearMessages());
    }

    handleSubmit(input)
    {
        const { PROFILE_ERROR_GENERIC, PROFILE_SUCCESSEDITING_EMAIL, PROFILE_ERROREDITING_EMAIL,
            PROFILE_SUCCESSEDITING_FIRSTNAME, PROFILE_ERROREDITING_FIRSTNAME, PROFILE_SUCCESSEDITING_LASTNAME, PROFILE_ERROREDITING_LASTNAME } = this.props.lang;
        if (input.name === "email")
        {
            if (isValidEmail(input.value))
            {
                if (input.value !== this.props.user.email)
                {
                    this.setState({ loadingEmail: true });
                    updateUser(this.props.user.email, this.props.user.token, input.value, null, null, null, null, (error, result) => {
                        this.setState({ loadingEmail: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage(PROFILE_SUCCESSEDITING_EMAIL));
                            this.props.dispatch(updateEmail(input.value));
                            this.props.cookies.set("user", {
                                token: this.props.user.token,
                                email: this.props.user.email,
                                rank: this.props.user.rank,
                                lang: this.props.user.lang
                            });
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage(PROFILE_ERROR_GENERIC));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage(PROFILE_ERROREDITING_EMAIL));
            }
        }
        else if (input.name === "firstname")
        {
            if (isValidFirstname(input.value))
            {
                if (input.value !== this.props.user.firstname)
                {
                    this.setState({ loadingFirstname: true });
                    updateUser(this.props.user.email, this.props.user.token, null, null, input.value, null, null, (error, result) => {
                        this.setState({ loadingFirstname: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage(PROFILE_SUCCESSEDITING_FIRSTNAME));
                            this.props.dispatch(updateFirstname(input.value));
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage(PROFILE_ERROR_GENERIC));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage(PROFILE_ERROREDITING_FIRSTNAME));
            }
        }
        else if (input.name === "lastname")
        {
            if (isValidLastname(input.value))
            {
                if (input.value !== this.props.user.lastname)
                {
                    this.setState({
                        loadingLastname: true
                    });
                    updateUser(this.props.user.email, this.props.user.token, null, null, null, input.value, null, (error, result) => {
                        this.setState({ loadingLastname: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage(PROFILE_SUCCESSEDITING_LASTNAME));
                            this.props.dispatch(updateLastname(input.value));
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage(PROFILE_ERROR_GENERIC));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage(PROFILE_ERROREDITING_LASTNAME));
            }
        }
    }

    handleClick(event)
    {
        if (event.target.id === "buttonAccountCreation")
        {
            this.setState({
                isAccountCreationFormDisplayed: true
            });
        }
    }

    handleAccountFormCreationSubmit(event)
    {
        const { 
            TWITTERACCOUNTFORM_NAME_INCORRECT,
            TWITTERACCOUNTFORM_NAME_NOT_UNIQUE,
            TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT,
            TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT,
            TWITTERACCOUNTFORM_GENERIC_ERROR,
            TWITTERACCOUNTFORM_CREATE_SUCCESS
        } = this.props.lang;
        const { name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret } = event.result;
        const messages = [];
        if (!isValidTwitterAccountName(name))
        {
            messages.push(TWITTERACCOUNTFORM_NAME_INCORRECT);
        }
        if (!isUniqueTwitterAccountName(name, this.props.accounts.data.map(account => account.name)))
        {
            messages.push(TWITTERACCOUNTFORM_NAME_NOT_UNIQUE);
        }
        if (!isValidTwitterAccountConsumerKey(consumerKey))
        {
            messages.push(TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT);
        }
        if (!isValidTwitterAccountConsumerSecret(consumerSecret))
        {
            messages.push(TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT);
        }
        if (!isValidTwitterAccountAccessTokenKey(accessTokenKey))
        {
            messages.push(TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT);
        }
        if (!isValidTwitterAccountAccessTokenSecret(accessTokenSecret))
        {
            messages.push(TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT);
        }
        if (messages.length === 0)
        {
            this.setState({
                loadingAccountForm: true
            });
            addAccount(this.props.user.email, this.props.user.token, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, (error, result) => {
                const nextState = {
                    loadingAccountForm: false
                };
                if (!error)
                {
                    this.props.dispatch(addAccountToProps(event.result.name, event.result.consumerKey, event.result.consumerSecret, event.result.accessTokenKey, event.result.accessTokenSecret));
                    this.props.dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_CREATE_SUCCESS));
                    nextState.isAccountCreationFormDisplayed = false;
                }
                else
                {
                    this.props.dispatch(sendFailureMessage(TWITTERACCOUNTFORM_GENERIC_ERROR));
                }
                this.setState(nextState);
            });
        }
        else
        {
            this.props.dispatch(sendFailureMessages(messages));
        }
    }

    handleAccountFormCreationCancel()
    {
        this.setState({
            isAccountCreationFormDisplayed: false
        });
    }

    handleLanguageChange(event)
    {
        const { PROFILE_SUCCESSEDITING_LANGUAGE, PROFILE_ERROREDITING_LASTNAME, PROFILE_ERROR_GENERIC } = this.props.lang;
        if (isValidLanguage(event.value, Object.values(Languages)))
        {
            this.setState({
                loadingLanguage: true
            });
            updateUser(this.props.user.email, this.props.user.token, null, null, null, null, event.value, (error, result) => {
                this.setState({
                    loadingLanguage: false
                });
                if (!error)
                {
                    this.props.dispatch(sendSuccessMessage(PROFILE_SUCCESSEDITING_LANGUAGE));
                    this.props.dispatch(updateLanguage(event.value));
                    this.props.dispatch(changeLanguage(event.value));
                    this.props.cookies.set("user", {
                        token: this.props.user.token,
                        email: this.props.user.email,
                        rank: this.props.user.rank,
                        lang: this.props.user.lang
                    });
                }
                else
                {
                    this.props.dispatch(sendFailureMessage(PROFILE_ERROR_GENERIC));
                }
            });
        }
        else
        {
            this.props.dispatch(sendFailureMessage(PROFILE_ERROREDITING_LASTNAME));
        }
    }

    render()
    {
        let panel;
        const { PROFILE_TITLE, PROFILE_EMAIL, PROFILE_FIRSTNAME, PROFILE_LASTNAME, PROFILE_LANGUAGE, PROFILE_ACCOUNT_LIST } = this.props.lang;
        if (this.state.isLoaded && this.state.isAccountListLoaded && this.state.isMaxAccountsLoaded)
        {            
            const maxAccountsDisplay = (this.props.accounts.data.length >= this.props.user.maxAccounts) ? <span style={ { float: "right" } }>{this.props.accounts.data.length}/{this.props.user.maxAccounts}</span> : <span style={ { float: "right" } }>{this.props.accounts.data.length}/{this.props.user.maxAccounts}<div id="buttonAccountCreation" className="input-group-addon edit-button" onClick={this.handleClick} style={ { display: "inline" } }><i id="buttonAccountCreation" className="fa fa-plus fa-fw"></i></div></span>;

            const accountContainer = (
                this.state.isAccountCreationFormDisplayed ?
                <TwitterAccountForm onSubmit={this.handleAccountFormCreationSubmit} cancel onCancel={this.handleAccountFormCreationCancel} loading={this.state.loadingAccountForm}/>
                :
                <span>
                    <div className="panel-heading">
                        <div className="input-group">
                            <h3 className="panel-title" style={ { width: "1000px" } }>{PROFILE_ACCOUNT_LIST} {maxAccountsDisplay}</h3>
                        </div>
                    </div>
                    <div className="panel-body">
                        {this.state.isAccountListLoaded ? <TwitterAccountList /> : undefined}
                    </div>
                </span>
            );
            panel = (
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{PROFILE_TITLE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">{PROFILE_EMAIL}</label>
                                <div className="col-sm-8">
                                    <TextInput name="email" value={this.props.user.email} onSubmit={this.handleSubmit} loading={this.state.loadingEmail}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname" className="col-sm-2">{PROFILE_FIRSTNAME}</label>
                                <div className="col-sm-8">
                                    <TextInput name="firstname" value={this.props.user.firstname} onSubmit={this.handleSubmit} loading={this.state.loadingFirstname}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname" className="col-sm-2">{PROFILE_LASTNAME}</label>
                                <div className="col-sm-8">
                                    <TextInput name="lastname" value={this.props.user.lastname} onSubmit={this.handleSubmit} loading={this.state.loadingLastname}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="language" className="col-sm-2">{PROFILE_LANGUAGE}</label>
                                <div className="col-sm-8">
                                    <ListInput name="language" options={Object.values(Languages)} defaultOption={this.props.user.lang} onChange={this.handleLanguageChange} loading={this.state.loadingLanguage} />
                                </div>
                            </div>
                            {accountContainer}
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            panel = (
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{PROFILE_TITLE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <LoadingCog center/>
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

export default withCookies(connect(mapStateToProps)(Profile));