import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withData } from "../withData";
import * as Data from "../../constants/Data";
import ArrayInput from "../inputs/ArrayInput";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Input from "../inputs/Input";
import Form from "../Form";
import SuccessButton from "../buttons/SuccessButton";
import DangerButton from "../buttons/DangerButton";
import SecondaryButton from "../buttons/SecondaryButton";
import FormGroup from "../FormGroup";

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
        const {
            title,
            edit,
            children,
            loading,
            cancel,
            messages,
            delete: hasDeleteButton
        } = this.props;
        const {
            deleteMode,
            name,
            consumerKey,
            consumerSecret,
            accessTokenKey,
            accessTokenSecret,
            blacklist
        } = this.state;
        return (
            <Form title={title ? edit ? TWITTERACCOUNTFORM_EDIT_TITLE : TWITTERACCOUNTFORM_CREATE_TITLE : null}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input id="name" name="name" value={name} label={TWITTERACCOUNTFORM_NAME} onChange={this.handleChange} autoFocus/>                
                <Input id="consumerKey" name="consumerKey" value={consumerKey} label={TWITTERACCOUNTFORM_CONSUMERKEY} onChange={this.handleChange}/>
                <Input id="consumerSecret" name="consumerSecret" value={consumerSecret} label={TWITTERACCOUNTFORM_CONSUMERSECRET} onChange={this.handleChange}/>
                <Input id="accessTokenKey" name="accessTokenKey" value={accessTokenKey} label={TWITTERACCOUNTFORM_ACCESSTOKENKEY} onChange={this.handleChange}/>
                <Input id="accessTokenSecret" name="accessTokenSecret" value={accessTokenSecret} label={TWITTERACCOUNTFORM_ACCESSTOKENSECRET} onChange={this.handleChange}/>
                <ArrayInput id="blacklist" name="blacklist" label={TWITTERACCOUNTFORM_BLACKLIST} onChange={this.handleChange} values={blacklist} unique/>
                <FormGroup>
                {
                    deleteMode ? (
                        loading ? (
                            <LoadingCog/>
                        ) : (
                            <Fragment>
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <DangerButton id="buttonDeleteYes" className="form-button"  onClick={this.handleClick}>{TWITTERACCOUNTFORM_DELETE_BUTTON}</DangerButton>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <SecondaryButton id="buttonDeleteNo" className="form-button" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CANCEL_BUTTON}</SecondaryButton>
                                </div>
                            </Fragment>
                        )
                    ) : (
                        <div>
                        {
                            loading ? (
                                <LoadingCog/>
                            ) : (
                                <Fragment>
                                    <div className="col-xs-12 col-sm-12 col-md-12">
                                        <SuccessButton id="buttonSubmit" className="form-button" onClick={this.handleClick}>{edit ? TWITTERACCOUNTFORM_EDIT_BUTTON : TWITTERACCOUNTFORM_CREATE_BUTTON}</SuccessButton>
                                    </div>
                                    {
                                        hasDeleteButton && (
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <DangerButton id="buttonDeleteMode" className="form-button" onClick={this.handleClick}>{TWITTERACCOUNTFORM_DELETE_BUTTON}</DangerButton>
                                            </div>
                                        )
                                    }
                                    {
                                        cancel && (
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <SecondaryButton id="buttonCancel" className="form-button" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CANCEL_BUTTON}</SecondaryButton>
                                            </div>
                                        )
                                    }
                                </Fragment>
                            )
                        }
                        </div>
                    )
                }
                </FormGroup>
                {children}
            </Form>
        );
    }
}

export default withData(TwitterAccountForm, [ Data.LANG ]);