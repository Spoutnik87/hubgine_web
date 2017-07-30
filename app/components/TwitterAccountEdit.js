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
import TwitterAccountForm from "./Forms/TwitterAccountForm";

class TwitterAccountEdit extends Component {
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
            TWITTERACCOUNTFORM_EDIT_SUCCESS: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_EDIT_ERROR: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_DELETE_SUCCESS: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_DELETE_ERROR: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loading: false,
            edit: false,
            name: this.props.name,
            consumerKey: "",
            consumerSecret: "",
            accessTokenKey: "",
            accessTokenSecret: ""
        };
        this.handleAccountFormEditionSubmit = this.handleAccountFormEditionSubmit.bind(this);
        this.handleAccountFormEditionCancel = this.handleAccountFormEditionCancel.bind(this);
        this.handleAccountFormEditionDelete = this.handleAccountFormEditionDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (!prevState.edit && this.state.edit)
        {
            this.setState({
                loading: true
            });
            getTwitterAccountKeys(this.props.user.email, this.props.user.token, this.state.name, (error, result) => {
                if (!error)
                {
                    this.setState({
                        loading: false,
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
        this.setState({
            edit: true
        });
    }

    handleAccountFormEditionSubmit(event)
    {
        const { 
            TWITTERACCOUNTFORM_NAME_INCORRECT,
            TWITTERACCOUNTFORM_NAME_NOT_UNIQUE,
            TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT,
            TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT,
            TWITTERACCOUNTFORM_EDIT_SUCCESS,
            TWITTERACCOUNTFORM_EDIT_ERROR
         } = this.props.lang;
        const { name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret } = event.result;
        const {
            name: initialName,
            consumerKey: initialConsumerKey,
            consumerSecret: initialConsumerSecret,
            accessTokenKey: initialAccessTokenKey,
            accessTokenSecret: initialAccessTokenSecret
        } = event.default;
        const messages = [];
        if (!isValidTwitterAccountName(name))
        {
            messages.push(TWITTERACCOUNTFORM_NAME_INCORRECT);
        }
        if (!isUniqueTwitterAccountName(name, this.props.accounts.map(account => { if (this.props.uid !== account.uid) return account.name; })))
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
                edit: false,
                loading: true
            });
            const newName = name !== initialName ? name : null;
            const newConsumerKey = consumerKey !== initialConsumerKey ? consumerKey : null;
            const newConsumerSecret = consumerSecret !== initialConsumerSecret ? consumerSecret : null;
            const newAccessTokenKey = accessTokenKey !== initialAccessTokenKey ? accessTokenKey : null;
            const newAccessTokenSecret = accessTokenSecret !== initialAccessTokenSecret ? accessTokenSecret : null;
            updateAccount(this.props.user.email, this.props.user.token, initialName, newName, newConsumerKey, newConsumerSecret, newAccessTokenKey, newAccessTokenSecret, (error, result) => {
                const state = {
                    loading: false
                };
                if (!error)
                {
                    state.name = name;
                    state.consumerKey = "";
                    state.consumerSecret = "";
                    state.accessTokenKey = "";
                    state.accessTokenSecret = "";
                    this.props.dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_EDIT_SUCCESS));
                }
                else
                {
                    this.props.dispatch(sendFailureMessage(TWITTERACCOUNTFORM_EDIT_ERROR));
                }
                this.setState(state);
            });
        }
        else
        {
            this.props.dispatch(sendFailureMessages(messages));
        }
    }

    handleAccountFormEditionCancel(event)
    {
        this.setState({
            edit: false
        });
    }

    handleAccountFormEditionDelete(event)
    {
        const { TWITTERACCOUNTFORM_DELETE_SUCCESS, TWITTERACCOUNTFORM_DELETE_ERROR } = this.props.lang;
        removeAccount(this.props.user.email, this.props.user.token, this.props.name, (error, result) => {
            if (!error)
            {
                this.props.dispatch(removeAccountFromProps(this.props.name));
                this.props.dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_DELETE_SUCCESS));
            }
            else
            {
                this.props.dispatch(sendFailureMessage(TWITTERACCOUNTFORM_DELETE_ERROR));
            }
        });
    }    

    render()
    {
        return (
            this.state.edit ?
                !this.state.loading ?
                <TwitterAccountForm onSubmit={this.handleAccountFormEditionSubmit} cancel onCancel={this.handleAccountFormEditionCancel} edit delete onDelete={this.handleAccountFormEditionDelete} account={{
                    name: this.state.name,
                    consumerKey: this.state.consumerKey,
                    consumerSecret: this.state.consumerSecret,
                    accessTokenKey: this.state.accessTokenKey,
                    accessTokenSecret: this.state.accessTokenSecret
                 }} />
                :
                <LoadingCog/>
            :
                !this.state.loading ? 
                <div className="input-group">
                    <div className="form-control">{this.state.name}</div>
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

export default connect(mapStateToProps)(TwitterAccountEdit);