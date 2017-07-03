import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isValidTwitterAccountName, isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret, isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret } from "validator";
import LoadingCog from "./LoadingCog";
import { addAccount } from "../util/api";
import * as Ranks from "../constants/Ranks";
import * as Languages from "../constants/Languages";
import { addAccount as addAccountToProps } from "../actions/accounts";
import { sendFailureMessage, sendSuccessMessage } from "../actions/messages";

class AccountCreateForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onQuit: PropTypes.func,
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
        if (event.target.id === "buttonSubmit")
        {
            const values = {
                name: this.state.name,
                consumerKey: this.state.consumerKey,
                consumerSecret: this.state.consumerSecret,
                accessTokenKey: this.state.accessTokenKey,
                accessTokenSecret: this.state.accessTokenSecret
            }
            if (isValidTwitterAccountName(values.name) && 
                isValidTwitterAccountConsumerKey(values.consumerKey) && 
                isValidTwitterAccountConsumerSecret(values.consumerSecret) && 
                isValidTwitterAccountAccessTokenKey(values.accessTokenKey) && 
                isValidTwitterAccountAccessTokenSecret(values.accessTokenSecret))
            {
                this.setState({
                    isLoaded: false
                });
                addAccount(this.props.user.email, this.props.user.token, values.name, values.consumerKey, values.consumerSecret, values.accessTokenKey, values.accessTokenSecret, (error, result) => {
                    if (!error)
                    {
                        this.setState({
                            isLoaded: true
                        });
                        this.props.dispatch(addAccountToProps({
                            name: values.name,
                            consumerKey: values.consumerKey,
                            consumerSecret: values.consumerSecret,
                            accessTokenKey: values.accessTokenKey,
                            accessTokenSecret: values.accessTokenSecret
                        }));
                        this.props.dispatch(sendSuccessMessage("An account was created successfully."));
                    }
                    else
                    {
                        this.props.dispatch(sendFailureMessage("An error happened."));
                    }
                    this.props.onSubmit({
                        name: values.name,
                        consumerKey: values.consumerKey,
                        consumerSecret: values.consumerSecret,
                        accessTokenKey: values.accessTokenKey,
                        accessTokenSecret: values.accessTokenSecret
                    });
                });
            }
        }
        else if (event.target.id === "buttonQuit")
        {
            this.props.onQuit();
        }
    }

    render()
    {
        return (
            this.state.isLoaded ?
            <div>
                <div className="panel-heading">
                    <div className="input-group">
                        <h3 className="panel-title">Create an account</h3>
                        <span id="buttonSubmit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonSubmit" className="fa fa-check fa-fw"></i></span>
                        <span id="buttonQuit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonQuit" className="fa fa-remove fa-fw"></i></span>
                    </div>
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
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountCreateForm);