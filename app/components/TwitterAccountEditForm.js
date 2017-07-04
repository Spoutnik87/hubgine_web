import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isValidTwitterAccountName, isUniqueTwitterAccountName, isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret, isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret } from "validator";
import { getTwitterAccountKeys, updateAccount, removeAccount } from "../util/api";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage } from "../actions/messages";
import { removeAccount as removeAccountFromProps } from "../actions/accounts";
import * as Ranks from "../constants/Ranks";
import * as Languages from "../constants/Languages";
import LoadingCog from "./LoadingCog";

class AccountEditForm extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        uid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        accounts: PropTypes.array.isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
            rank: PropTypes.oneOf(Object.values(Ranks)).isRequired,
            lang: PropTypes.oneOf(Object.values(Languages)).isRequired
        }),
        lang: PropTypes.shape({
            TWITTERACCOUNTFORM_NAME_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_NAME_NOT_UNIQUE: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_GENERIC_ERROR: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_NAME: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERKEY: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERSECRET: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET: PropTypes.string.isRequired,
            TWITTERACCOUNTEDITFORM_DELETE_BUTTON: PropTypes.string.isRequired,
            TWITTERACCOUNTEDITFORM_EDIT_SUCCESS: PropTypes.string.isRequired,
            TWITTERACCOUNTEDITFORM_EDIT_ERROR: PropTypes.string.isRequired,
            TWITTERACCOUNTEDITFORM_DELETE_SUCCESS: PropTypes.string.isRequired,
            TWITTERACCOUNTEDITFORM_DELETE_ERROR: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            onEditMode: false,
            isLoaded: true,
            initialName: this.props.name,
            initialConsumerKey: "",
            initialConsumerSecret: "",
            initialAccessTokenKey: "",
            initialAccessTokenSecret: "",
            name: this.props.name,
            consumerKey: "",
            consumerSecret: "",
            accessTokenKey: "",
            accessTokenSecret: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (!prevState.onEditMode && this.state.onEditMode)
        {
            this.setState({
                isLoaded: false
            });
            getTwitterAccountKeys(this.props.user.email, this.props.user.token, this.state.initialName, (error, result) => {
                if (!error)
                {
                    this.setState({
                        isLoaded: true,
                        initialConsumerKey: result.consumer_key,
                        initialConsumerSecret: result.consumer_secret,
                        initialAccessTokenKey: result.access_token_key,
                        initialAccessTokenSecret: result.access_token_secret,
                        consumerKey: result.consumer_key,
                        consumerSecret: result.consumer_secret,
                        accessTokenKey: result.access_token_key,
                        accessTokenSecret: result.access_token_secret
                    });
                }
                else
                {
                    const { TWITTERACCOUNTFORM_GENERIC_ERROR } = this.props.lang;
                    this.props.dispatch(sendFailureMessage(TWITTERACCOUNTFORM_GENERIC_ERROR));
                }
            });
        }
    }

    handleClick(event)
    {
        const { 
            TWITTERACCOUNTFORM_NAME_INCORRECT,
            TWITTERACCOUNTFORM_NAME_NOT_UNIQUE,
            TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT,
            TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT,
            TWITTERACCOUNTEDITFORM_EDIT_SUCCESS,
            TWITTERACCOUNTEDITFORM_EDIT_ERROR,
            TWITTERACCOUNTEDITFORM_DELETE_SUCCESS,
            TWITTERACCOUNTEDITFORM_DELETE_ERROR
         } = this.props.lang;
        if (event.target.id === "buttonEditMode")
        {
            this.setState({
                value: this.props.value,
                onEditMode: true
            });
        }
        else if (event.target.id === "buttonCancel")
        {
            this.setState({
                onEditMode: false
            });
        }
        else if (event.target.id === "buttonValidate")
        {
            const values = {
                name: this.state.name,
                consumerKey: this.state.consumerKey,
                consumerSecret: this.state.consumerSecret,
                accessTokenKey: this.state.accessTokenKey,
                accessTokenSecret: this.state.accessTokenSecret
            };
            const messages = [];
            if (!isValidTwitterAccountName(values.name))
            {
                messages.push(TWITTERACCOUNTFORM_NAME_INCORRECT);
            }
            if (!isUniqueTwitterAccountName(values.name, this.props.accounts.map(account => { if (this.props.uid !== account.uid) return account.name; })))
            {
                messages.push(TWITTERACCOUNTFORM_NAME_NOT_UNIQUE);
            }
            if (!isValidTwitterAccountConsumerKey(values.consumerKey))
            {
                messages.push(TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT);
            }
            if (!isValidTwitterAccountConsumerSecret(values.consumerSecret))
            {
                messages.push(TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT);
            }
            if (!isValidTwitterAccountAccessTokenKey(values.accessTokenKey))
            {
                messages.push(TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT);
            }
            if (!isValidTwitterAccountAccessTokenSecret(values.accessTokenSecret))
            {
                messages.push(TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT);
            }
            if (messages.length === 0)
            {
                this.setState({
                    onEditMode: false,
                    isLoaded: false
                });
                const newName = values.name !== this.state.initialName ? values.name : null;
                const newConsumerKey = values.consumerKey !== this.state.initialConsumerKey ? values.consumerKey : null;
                const newConsumerSecret = values.consumerSecret !== this.state.initialConsumerSecret ? values.consumerSecret : null;
                const newAccessTokenKey = values.accessTokenKey !== this.state.initialAccessTokenKey ? values.accessTokenKey : null;
                const newAccessTokenSecret = values.accessTokenSecret !== this.state.initialAccessTokenSecret ? values.accessTokenSecret : null;
                updateAccount(this.props.user.email, this.props.user.token, this.state.initialName, newName, newConsumerKey, newConsumerSecret, newAccessTokenKey, newAccessTokenSecret, (error, result) => {
                    if (!error)
                    {
                        this.setState({
                            isLoaded: true,
                            initialName: values.name,
                            initialConsumerKey: values.consumerKey,
                            initialConsumerSecret: values.consumerSecret,
                            initialAccessTokenKey: values.accessTokenKey,
                            initialAccessTokenSecret: values.accessTokenSecret
                        });
                        this.props.dispatch(sendSuccessMessage(TWITTERACCOUNTEDITFORM_EDIT_SUCCESS));
                    }
                    else
                    {
                        this.setState({
                           isLoaded: true
                        });
                        this.props.dispatch(sendFailureMessage(TWITTERACCOUNTEDITFORM_EDIT_ERROR));
                    }
                });
            }
            else
            {
                this.props.dispatch(sendFailureMessages(messages));
            }
        }
        else if (event.target.id === "buttonDelete")
        {
            removeAccount(this.props.user.email, this.props.user.token, this.props.name, (error, result) => {
                if (!error)
                {
                    this.props.dispatch(removeAccountFromProps(this.props.name));
                    this.props.dispatch(sendSuccessMessage(TWITTERACCOUNTEDITFORM_DELETE_SUCCESS));
                }
                else
                {
                    this.props.dispatch(sendFailureMessage(TWITTERACCOUNTEDITFORM_DELETE_ERROR));
                }
            });
        }
    }
    
    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    render()
    {
        const { 
            TWITTERACCOUNTFORM_NAME,
            TWITTERACCOUNTFORM_CONSUMERKEY,
            TWITTERACCOUNTFORM_CONSUMERSECRET,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET,
            TWITTERACCOUNTEDITFORM_DELETE_BUTTON
         } = this.props.lang;
        return (
            this.state.onEditMode ?
                this.state.isLoaded ?
                <div className="panel">
                    <div className="panel-heading">
                        <div className="form-group">
                            <label className="col-sm-2">{TWITTERACCOUNTFORM_NAME}</label>
                            <span className="input-group col-sm-10">
                                <span className="col-sm-9">
                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} autoFocus/>
                                </span>
                                <span id="buttonValidate" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonValidate" className="fa fa-check fa-fw"></i></span>
                                <span id="buttonCancel" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonCancel" className="fa fa-remove fa-fw"></i></span>
                            </span>
                        </div>
                        <hr/>
                    </div>
                    <div className="panel-body">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2">{TWITTERACCOUNTFORM_CONSUMERKEY}</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="consumerKey" value={this.state.consumerKey} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">{TWITTERACCOUNTFORM_CONSUMERSECRET}</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="consumerSecret" value={this.state.consumerSecret} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">{TWITTERACCOUNTFORM_ACCESSTOKENKEY}</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="accessTokenKey" value={this.state.accessTokenKey} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">{TWITTERACCOUNTFORM_ACCESSTOKENSECRET}</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="accessTokenSecret" value={this.state.accessTokenSecret} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <button id="buttonDelete" type="button" className="btn btn-danger" onClick={this.handleClick}><i className="fa fa-trash"></i> {TWITTERACCOUNTEDITFORM_DELETE_BUTTON}</button>
                        </div>
                    </div>
                </div>
                :
                <LoadingCog/>
            :
                this.state.isLoaded ? 
                <div className="input-group">
                    <div className="form-control">{this.state.initialName}</div>
                    <span id="buttonEditMode" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonEditMode" className="fa fa-pencil fa-fw"></i></span>
                </div>
                :
                <LoadingCog/>
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

export default connect(mapStateToProps)(AccountEditForm);