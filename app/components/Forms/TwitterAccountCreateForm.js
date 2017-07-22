import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isValidTwitterAccountName, isUniqueTwitterAccountName, isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret, isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret } from "validator";
import LoadingCog from "../LoadingCog";
import { addAccount } from "../../util/api";
import * as Ranks from "../../constants/Ranks";
import * as Languages from "../../constants/Languages";
import { addAccount as addAccountToProps } from "../../actions/accounts";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage } from "../../actions/messages";

class TwitterAccountCreateForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onQuit: PropTypes.func,
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
            TWITTERACCOUNTCREATEFORM_SUCCESS: PropTypes.string.isRequired,
            TWITTERACCOUNTCREATEFORM_TITLE: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: true,
            name: "",
            consumerKey: "",
            consumerSecret: "",
            accessTokenKey: "",
            accessTokenSecret: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
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
            TWITTERACCOUNTFORM_GENERIC_ERROR,
            TWITTERACCOUNTCREATEFORM_SUCCESS
        } = this.props.lang;
        if (event.target.id === "buttonSubmit")
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
            if (!isUniqueTwitterAccountName(values.name, this.props.accounts.map(account => { return account.name; })))
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
                    isLoaded: false
                });
                addAccount(this.props.user.email, this.props.user.token, values.name, values.consumerKey, values.consumerSecret, values.accessTokenKey, values.accessTokenSecret, (error, result) => {
                    this.setState({
                        isLoaded: true
                    });
                    if (!error)
                    {
                        this.props.dispatch(addAccountToProps(values));
                        this.props.dispatch(sendSuccessMessage(TWITTERACCOUNTCREATEFORM_SUCCESS));
                    }
                    else
                    {
                        this.props.dispatch(sendFailureMessage(TWITTERACCOUNTFORM_GENERIC_ERROR));
                    }
                    this.props.onSubmit(values);
                });
            }
            else
            {
                this.props.dispatch(sendFailureMessages(messages));
            }
        }
        else if (event.target.id === "buttonQuit")
        {
            this.props.onQuit();
        }
    }

    render()
    {
        const { 
            TWITTERACCOUNTCREATEFORM_TITLE, 
            TWITTERACCOUNTFORM_NAME,
            TWITTERACCOUNTFORM_CONSUMERKEY,
            TWITTERACCOUNTFORM_CONSUMERSECRET,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET
        } = this.props.lang;
        return (
            this.state.isLoaded ?
            <div>
                <div className="panel-heading">
                    <div className="input-group">
                        <h3 className="panel-title">{TWITTERACCOUNTCREATEFORM_TITLE}</h3>
                        <span id="buttonSubmit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonSubmit" className="fa fa-check fa-fw"></i></span>
                        <span id="buttonQuit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonQuit" className="fa fa-remove fa-fw"></i></span>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="form-horizontal">
                        <div className="form-group">
                                <label className="col-sm-2">{TWITTERACCOUNTFORM_NAME}</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
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
                        </div>
                </div>
            </div>
            :
            <div style={ { textAlign: "center" } }>
                <LoadingCog/>
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

export default connect(mapStateToProps)(TwitterAccountCreateForm);