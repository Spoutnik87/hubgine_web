import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import ArrayInput from "../Inputs/ArrayInput";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Input from "../Inputs/Input";
import Form from "../Form";
import SuccessButton from "../buttons/SuccessButton";
import DangerButton from "../buttons/DangerButton";
import DefaultButton from "../buttons/DefaultButton";

class TwitterAccountForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            TWITTERACCOUNTFORM_NAME: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERKEY: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERSECRET: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_BLACKLIST: PropTypes.string.isRequired,
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
            accessTokenSecret: PropTypes.string,
            blacklist: PropTypes.arrayOf(PropTypes.string.isRequired)
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
                accessTokenSecret: this.props.account.accessTokenSecret,
                blacklist: this.props.account.blacklist
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
                accessTokenSecret: "",
                blacklist: []
            };
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            [event.name]: event.value || event.values
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
                accessTokenSecret: this.state.accessTokenSecret,
                blacklist: this.state.blacklist
            }
        };
        if (this.props.account) send.default = {
            uid: this.props.account.uid,
            name: this.props.account.name,
            consumerKey: this.props.account.consumerKey,
            consumerSecret: this.props.account.consumerSecret,
            accessTokenKey: this.props.account.accessTokenKey,
            accessTokenSecret: this.props.account.accessTokenSecret,
            blacklist: this.props.account.blacklist
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
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET,
            TWITTERACCOUNTFORM_BLACKLIST
        } = this.props.lang;
        const buttonSubmit = this.props.loading ? <LoadingCog/> : <SuccessButton id="buttonSubmit" onClick={this.handleClick}>{this.props.edit ? TWITTERACCOUNTFORM_EDIT_BUTTON : TWITTERACCOUNTFORM_CREATE_BUTTON}</SuccessButton>;
        const buttonDelete = this.props.delete && !this.props.loading && <DangerButton id="buttonDeleteMode" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERACCOUNTFORM_DELETE_BUTTON}</DangerButton>;
        const buttonCancel = this.props.cancel && !this.props.loading && <DefaultButton id="buttonCancel" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CANCEL_BUTTON}</DefaultButton>;
        const messages = this.props.messages && <Messages messages={this.props.messages}/>;
        const deleteMode = this.state.deleteMode ? this.props.loading ? <LoadingCog /> : <div className="col-sm-12"><DangerButton id="buttonDeleteYes" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERACCOUNTFORM_DELETE_BUTTON}</DangerButton>
            <DefaultButton id="buttonDeleteNo" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CANCEL_BUTTON}</DefaultButton></div>
            : <div className="col-sm-12">{buttonSubmit}<div style={{ float: "right" }}>{buttonDelete}{buttonCancel}</div></div>;
        return (
            <Form title={this.props.title ? this.props.edit ? TWITTERACCOUNTFORM_EDIT_TITLE : TWITTERACCOUNTFORM_CREATE_TITLE : null}>
                {messages}
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERACCOUNTFORM_NAME}</label>
                    <div className="col-sm-10">
                        <Input className="form-control" name="name" value={this.state.name} onChange={this.handleChange} autoFocus/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERACCOUNTFORM_CONSUMERKEY}</label>
                    <div className="col-sm-10">
                        <Input className="form-control" name="consumerKey" value={this.state.consumerKey} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERACCOUNTFORM_CONSUMERSECRET}</label>
                    <div className="col-sm-10">
                        <Input className="form-control" name="consumerSecret" value={this.state.consumerSecret} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERACCOUNTFORM_ACCESSTOKENKEY}</label>
                    <div className="col-sm-10">
                        <Input className="form-control" name="accessTokenKey" value={this.state.accessTokenKey} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERACCOUNTFORM_ACCESSTOKENSECRET}</label>
                    <div className="col-sm-10">
                        <Input className="form-control" name="accessTokenSecret" value={this.state.accessTokenSecret} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERACCOUNTFORM_BLACKLIST}</label>
                    <div className="col-sm-10">
                        <ArrayInput name="blacklist" onChange={this.handleChange} values={this.state.blacklist} unique />
                    </div>
                </div>
                <div className="form-group">
                    {deleteMode}
                </div>
                {this.props.children}
            </Form>
        );
    }
}

export default withLanguage(TwitterAccountForm);