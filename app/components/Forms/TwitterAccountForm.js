import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";

class TwitterAccountForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            TWITTERACCOUNTFORM_NAME: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERKEY: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERSECRET: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CREATE_TITLE: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_EDIT_TITLE: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_DELETE_BUTTON: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CREATE_BUTTON: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_EDIT_BUTTON: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CANCEL_BUTTON: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        cancel: PropTypes.bool,
        onDelete: PropTypes.func,
        delete: PropTypes.bool,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        edit: PropTypes.bool,
        account: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            consumerKey: PropTypes.string,
            consumerSecret: PropTypes.string,
            accessTokenKey: PropTypes.string,
            accessTokenSecret: PropTypes.string
        }),
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "twitteraccount",
        onSubmit: () => {},
        onCancel: () => {},
        cancel: false,
        onDelete: () => {},
        delete: false,
        title: true,
        loading: false,
        edit: false,
        account: undefined,
        messages: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
            deleteMode: false
        };
        if (this.props.account)
        {
            this.state = {
                ...this.state,
                name: this.props.account.name,
                consumerKey: this.props.account.consumerKey,
                consumerSecret: this.props.account.consumerSecret,
                accessTokenKey: this.props.account.accessTokenKey,
                accessTokenSecret: this.props.account.accessTokenSecret
            };
        }
        else
        {
            this.state = {
                ...this.state,
                name: "",
                consumerKey: "",
                consumerSecret: "",
                accessTokenKey: "",
                accessTokenSecret: ""
            };
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick(event)
    {
        const send = {
            name: this.props.name,
            result: {
                name: this.state.name,
                consumerKey: this.state.consumerKey,
                consumerSecret: this.state.consumerSecret,
                accessTokenKey: this.state.accessTokenKey,
                accessTokenSecret: this.state.accessTokenSecret
            }
        };
        if (this.props.account) send.default = {
            uid: this.props.account.uid,
            name: this.props.account.name,
            consumerKey: this.props.account.consumerKey,
            consumerSecret: this.props.account.consumerSecret,
            accessTokenKey: this.props.account.accessTokenKey,
            accessTokenSecret: this.props.account.accessTokenSecret
        };
        if (event.target.id === "buttonSubmit")
        {
            this.props.onSubmit(send);
        }
        else if (event.target.id === "buttonCancel")
        {
            this.props.onCancel(send);
        }
        else if (event.target.id === "buttonDeleteMode")
        {
            this.setState({
                deleteMode: true
            });
        }
        else if (event.target.id === "buttonDeleteYes")
        {
            this.props.onDelete(send);
        }
        else if (event.target.id === "buttonDeleteNo")
        {
            this.setState({
                deleteMode: false
            });
        }
    }

    render()
    {
        const {
            TWITTERACCOUNTFORM_DELETE_BUTTON,
            TWITTERACCOUNTFORM_CREATE_BUTTON,
            TWITTERACCOUNTFORM_EDIT_BUTTON,
            TWITTERACCOUNTFORM_CANCEL_BUTTON,
            TWITTERACCOUNTFORM_CREATE_TITLE,
            TWITTERACCOUNTFORM_EDIT_TITLE,
            TWITTERACCOUNTFORM_NAME,
            TWITTERACCOUNTFORM_CONSUMERKEY,
            TWITTERACCOUNTFORM_CONSUMERSECRET,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET
        } = this.props.lang;
        const buttonSubmit = this.props.loading ? <LoadingCog/> : this.props.edit ? <button id="buttonSubmit" className="btn btn-primary" onClick={this.handleClick}>{TWITTERACCOUNTFORM_EDIT_BUTTON}</button> : <button id="buttonSubmit" className="btn btn-success" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CREATE_BUTTON}</button>;
        const buttonDelete = this.props.delete && !this.props.loading && <button id="buttonDeleteMode" className="btn btn-danger" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERACCOUNTFORM_DELETE_BUTTON}</button>;
        const buttonCancel = this.props.cancel && !this.props.loading && <button id="buttonCancel" className="btn btn-default" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CANCEL_BUTTON}</button>;
        const title = this.props.title && <div className="panel-heading"><h3 className="panel-title">{this.props.edit ? TWITTERACCOUNTFORM_EDIT_TITLE : TWITTERACCOUNTFORM_CREATE_TITLE}</h3></div>;
        const messages = this.props.messages && <Messages messages={this.props.messages}/>;
        const deleteMode = this.state.deleteMode ? this.props.loading ? <LoadingCog /> : <div className="col-sm-10"><button id="buttonDeleteYes" className="btn btn-danger" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERACCOUNTFORM_DELETE_BUTTON}</button>
            <button id="buttonDeleteNo" className="btn btn-default" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CANCEL_BUTTON}</button></div>
            : <div className="col-sm-10">{buttonSubmit}<div style={{ float: "right" }}>{buttonDelete}{buttonCancel}</div></div>;
        return (
            <div>
                {title}
                <div className="panel-body form-horizontal">
                    {messages}
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
                    <div className="form-group">
                        {deleteMode}
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withLanguage(TwitterAccountForm);