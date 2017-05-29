import React, { Component } from "react";
import validator from "validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAccountKeys, updateAccount } from "../util/api";
import { updateAccountName } from "../actions/accounts";
import { sendFailureMessage } from "../actions/messages";
import * as Ranks from "../constants/Ranks";
import * as Languages from "../constants/Languages";
import LoadingCog from "./LoadingCog";

class AccountEditForm extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
            rank: PropTypes.oneOf(Object.values(Ranks)).isRequired,
            lang: PropTypes.oneOf(Object.values(Languages)).isRequired
        }),
        lang: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            onEditMode: false,
            isLoaded: true,
            initialName: "",
            initialConsumerKey: "",
            initialConsumerSecret: "",
            initialAccessTokenKey: "",
            initialAccessTokenSecret: "",
            name: "",
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
            getAccountKeys(this.props.user.email, this.props.user.token, this.props.name, (error, result) => {
                if (!error)
                {
                    this.setState({
                        isLoaded: true,
                        initialName: this.props.name,
                        initialConsumerKey: result.consumer_key,
                        initialConsumerSecret: result.consumer_secret,
                        initialAccessTokenKey: result.access_token_key,
                        initialAccessTokenSecret: result.access_token_secret,
                        name: this.props.name,
                        consumerKey: result.consumer_key,
                        consumerSecret: result.consumer_secret,
                        accessTokenKey: result.access_token_key,
                        accessTokenSecret: result.access_token_secret
                    });
                }
                else
                {
                    this.props.dispatch(sendFailureMessage([{ msg: "An error happened." }]));
                }
            });
        }
    }

    handleClick(event)
    {
        if (event.target.id === "buttonEditMode")
        {
            this.setState({
                value: this.props.value,
                onEditMode: true
            });
        }
        if (event.target.id === "buttonCancel")
        {
            this.setState({
                onEditMode: false
            });
        }
        if (event.target.id === "buttonValidate")
        {
            const values = {
                name: this.state.name,
                consumerKey: this.state.consumerKey,
                consumerSecret: this.state.consumerSecret,
                accessTokenKey: this.state.accessTokenKey,
                accessTokenSecret: this.state.accessTokenSecret
            };
            const progress = {
                nameUpdated: false,
                consumerKeyUpdated: false,
                consumerSecretUpdated: false,
                accessTokenKeyUpdated: false,
                accessTokenSecretUpdated: false
            };
            if (!validator.isEmpty(values.name) && !validator.isEmpty(values.consumerKey) && !validator.isEmpty(values.consumerSecret) && !validator.isEmpty(values.accessTokenKey) && !validator.isEmpty(values.accessTokenSecret))
            {
                this.setState({
                    onEditMode: false,
                    isLoaded: false
                });
                if (values.name !== this.state.initialName)
                {
                    updateAccount(this.props.user.email, this.props.user.token, this.props.name, "name", values.name, (error, result) => {
                        if (!error)
                        {
                            progress.nameUpdated = true;
                            this.props.dispatch(updateAccountName(this.props.id, values.name));
                            if (progress.nameUpdated && progress.consumerKeyUpdated && progress.consumerSecretUpdated && progress.accessTokenKeyUpdated && progress.accessTokenSecretUpdated && !this.state.isLoaded)
                            {
                                this.setState({
                                    isLoaded: true
                                });
                            }
                        }
                    });
                }
                else
                {
                    progress.nameUpdated = true;
                }
                if (values.consumerKey !== this.state.initialConsumerKey)
                {
                    updateAccount(this.props.user.email, this.props.user.token, this.props.name, "consumer_key", values.consumerKey, (error, result) => {
                        if (!error)
                        {
                            progress.consumerKeyUpdated = true;
                            if (progress.nameUpdated && progress.consumerKeyUpdated && progress.consumerSecretUpdated && progress.accessTokenKeyUpdated && progress.accessTokenSecretUpdated && !this.state.isLoaded)
                            {
                                this.setState({
                                    isLoaded: true
                                });
                            }
                        }
                    });
                }
                else
                {
                    progress.consumerKeyUpdated = true;
                }
                if (values.consumerSecret !== this.state.initialConsumerSecret)
                {
                    updateAccount(this.props.user.email, this.props.user.token, this.props.name, "consumer_secret", values.consumerSecret, (error, result) => {
                        if (!error)
                        {
                            progress.consumerSecretUpdated = true;
                            if (progress.nameUpdated && progress.consumerKeyUpdated && progress.consumerSecretUpdated && progress.accessTokenKeyUpdated && progress.accessTokenSecretUpdated && !this.state.isLoaded)
                            {
                                this.setState({
                                    isLoaded: true
                                });
                            }
                        }
                    });
                }
                else
                {
                    progress.consumerSecretUpdated = true;
                }
                if (values.accessTokenKey !== this.state.initialAccessTokenKey)
                {
                    updateAccount(this.props.user.email, this.props.user.token, this.props.name, "access_token_key", values.accessTokenKey, (error, result) => {
                        if (!error)
                        {
                            progress.accessTokenKeyUpdated = true;
                            if (progress.nameUpdated && progress.consumerKeyUpdated && progress.consumerSecretUpdated && progress.accessTokenKeyUpdated && progress.accessTokenSecretUpdated && !this.state.isLoaded)
                            {
                                this.setState({
                                    isLoaded: true
                                });
                            }
                        }
                    });
                }
                else
                {
                    progress.accessTokenKeyUpdated = true;
                }
                if (values.accessTokenSecret !== this.state.initialAccessTokenSecret)
                {
                    updateAccount(this.props.user.email, this.props.user.token, this.props.name, "access_token_secret", values.accessTokenSecret, (error, result) => {
                        if (!error)
                        {
                            progress.accessTokenSecretUpdated = true;
                            if (progress.nameUpdated && progress.consumerKeyUpdated && progress.consumerSecretUpdated && progress.accessTokenKeyUpdated && progress.accessTokenSecretUpdated && !this.state.isLoaded)
                            {
                                this.setState({
                                    isLoaded: true
                                });
                            }
                        }
                    });
                }
                else
                {
                    progress.accessTokenSecretUpdated = true;
                }
                if (progress.nameUpdated && progress.consumerKeyUpdated && progress.consumerSecretUpdated && progress.accessTokenKeyUpdated && progress.accessTokenSecretUpdated && !this.state.isLoaded)
                {
                    this.setState({
                        isLoaded: true
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: "An error happened." }]));
            }
            /*if (!validator.isEmpty(this.state.name))
            {
                if (this.state.name !== this.state.initialName)
                {
                    this.setState({
                        isLoaded: false
                    });
                    updateAccount(this.props.user.email, this.props.user.token, "name", this.state.name, (error, result) => {
                        this.setState({ loadingLastname: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage([{ msg: PROFILE_SUCCESSEDITING_LASTNAME }]));
                            this.props.dispatch(updateLastname(input.value));
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERROR_GENERIC }]));
                        }
                    });
                }
            }*/
            /*const values = {};
            if (this.state.name !== this.state.initialName)
            {
                values["name"] = this.state.name;
            }
            if (this.state.consumerKey !== this.state.initialConsumerKey)
            {
                values["consumerKey"] = this.state.consumerKey;
            }
            if (this.state.consumerSecret !== this.state.initialConsumerSecret)
            {
                values["consumerSecret"] = this.state.consumerSecret;
            }
            if (this.state.accessTokenKey !== this.state.initialAccessTokenKey)
            {
                values["accessTokenKey"] = this.state.accessTokenKey;
            }
            if (this.state.accessTokenSecret !== this.state.initialAccessTokenSecret)
            {
                values["accessTokenSecret"] = this.state.accessTokenSecret;
            }
            this.props.onValidate({
                name: "account",
                id: this.state.initialName,
                values
            });*/
        }
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    render()
    {
        return (
            this.state.onEditMode ?
                this.state.isLoaded ?
                <div className="panel">
                    <div className="panel-heading">
                        <div className="col-sm-10">
                            <h3 className="panel-title">Account name : {this.props.name}</h3>
                        </div>
                        <div className="col-sm-2">
                            <span id="buttonValidate" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonValidate" className="fa fa-check fa-fw"></i></span>
                            <span id="buttonCancel" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonCancel" className="fa fa-remove fa-fw"></i></span>
                        </div>
                        <hr/>
                    </div>
                    <div className="panel-body">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2">Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">Consumer key</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="consumerKey" value={this.state.consumerKey} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">Consumer secret</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="consumerSecret" value={this.state.consumerSecret} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">Access token key</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="accessTokenKey" value={this.state.accessTokenKey} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">Access token secret</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" name="accessTokenKey" value={this.state.accessTokenSecret} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <LoadingCog/>
            :
                this.state.isLoaded ? 
                <div className="input-group">
                    <div className="form-control">{this.props.name}</div>
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
    };
};

export default connect(mapStateToProps)(AccountEditForm);