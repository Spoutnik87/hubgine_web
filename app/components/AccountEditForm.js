import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isValidTwitterAccountName, isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret, isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret } from "validator";
import { getTwitterAccountKeys, updateAccount, removeAccount } from "../util/api";
import { sendFailureMessage, sendSuccessMessage } from "../actions/messages";
import { removeAccount as removeAccountFromProps } from "../actions/accounts";
import * as Ranks from "../constants/Ranks";
import * as Languages from "../constants/Languages";
import LoadingCog from "./LoadingCog";

class AccountEditForm extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
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
                    this.props.dispatch(sendFailureMessage("An error happened."));
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
            if (isValidTwitterAccountName(values.name) && 
                isValidTwitterAccountConsumerKey(values.consumerKey) && 
                isValidTwitterAccountConsumerSecret(values.consumerSecret) && 
                isValidTwitterAccountAccessTokenKey(values.accessTokenKey) && 
                isValidTwitterAccountAccessTokenSecret(values.accessTokenSecret))
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
                    }
                });
            }
            else
            {
                this.props.dispatch(sendFailureMessage("An error happened."));
            }
        }
        else if (event.target.id === "buttonDelete")
        {
            removeAccount(this.props.user.email, this.props.user.token, this.props.name, (error, result) => {
                if (!error)
                {
                    this.props.dispatch(removeAccountFromProps(this.props.name));
                    this.props.dispatch(sendSuccessMessage("This account was deleted successfully."));
                }
                else
                {
                    this.props.dispatch(sendFailureMessage("An error happened."));
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
        return (
            this.state.onEditMode ?
                this.state.isLoaded ?
                <div className="panel">
                    <div className="panel-heading">
                        <div className="form-group">
                            <label className="col-sm-2">Account name</label>
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
                                    <input type="text" className="form-control" name="accessTokenSecret" value={this.state.accessTokenSecret} onChange={this.handleChange} autoFocus/>
                                </div>
                            </div>
                            <button id="buttonDelete" type="button" className="btn btn-danger" onClick={this.handleClick}><i className="fa fa-trash"></i> Delete this account</button>
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
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountEditForm);