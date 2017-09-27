import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import LoadingCog from "../LoadingCog";
import Messages from "../Messages";
import { fetchAccountKeys } from "../../actions/accounts";
//import { getTwitterAccountKeys } from "../../net/Requests";

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
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
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
        messages: PropTypes.object,
        account: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            consumerKey: PropTypes.string,
            consumerSecret: PropTypes.string,
            accessTokenKey: PropTypes.string,
            accessTokenSecret: PropTypes.string
        })
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
        messages: undefined,
        account: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isAccountLoaded: true,
            deleteMode: false,
            name: this.props.account ? this.props.account.name : "",
            oldConsumerKey: "",
            oldConsumerSecret: "",
            oldAccessTokenKey: "",
            oldAccessTokenSecret: "",
            consumerKey: "",
            consumerSecret: "",
            accessTokenKey: "",
            accessTokenSecret: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount()
    {
        if (this.props.account && this.props.edit)
        {
            this.setState({
                isAccountLoaded: false
            });
            this.props.actions.fetchAccountKeys(this.state.name).then(() => {
                this.setState({
                    isAccountLoaded: true,
                    oldConsumerKey: this.props.account.consumerKey,
                    oldConsumerSecret: this.props.account.consumerSecret,
                    oldAccessTokenKey: this.props.account.accessTokenKey,
                    oldAccessTokenSecret: this.props.account.accessTokenSecret,
                    consumerKey: this.props.account.consumerKey,
                    consumerSecret: this.props.account.consumerSecret,
                    accessTokenKey: this.props.account.accessTokenKey,
                    accessTokenSecret: this.props.account.accessTokenSecret
                });
            });
            /*this.props.actions.fetchAccountKeys(this.state.name).then(result => {
                this.setState({
                    isAccountLoaded: true,
                    oldConsumerKey: result.consumer_key,
                    oldConsumerSecret: result.consumer_secret,
                    oldAccessTokenKey: result.access_token_key,
                    oldAccessTokenSecret: result.access_token_secret,
                    consumerKey: result.consumer_key,
                    consumerSecret: result.consumer_secret,
                    accessTokenKey: result.access_token_key,
                    accessTokenSecret: result.access_token_secret
                });
            }).catch(error => {
                this.setState({
                    isAccountLoaded: true,
                    oldConsumerKey: this.props.account.consumerKey,
                    oldConsumerSecret: this.props.account.consumerSecret,
                    oldAccessTokenKey: this.props.account.accessTokenKey,
                    oldAccessTokenSecret: this.props.account.accessTokenSecret,
                    consumerKey: this.props.account.consumerKey,
                    consumerSecret: this.props.account.consumerSecret,
                    accessTokenKey: this.props.account.accessTokenKey,
                    accessTokenSecret: this.props.account.accessTokenSecret
                });
            });*/
            /*getTwitterAccountKeys(this.props.user.email, this.props.user.token, this.state.name, this.props.account, (error, result) => {
                let state = {
                    isAccountLoaded: true
                };
                if (!error)
                {
                    if (result)
                    {
                        state = {
                            ...state,
                            oldConsumerKey: result.consumer_key,
                            oldConsumerSecret: result.consumer_secret,
                            oldAccessTokenKey: result.access_token_key,
                            oldAccessTokenSecret: result.access_token_secret,
                            consumerKey: result.consumer_key,
                            consumerSecret: result.consumer_secret,
                            accessTokenKey: result.access_token_key,
                            accessTokenSecret: result.access_token_secret
                        };
                        this.props.dispatch(updateAccountKeys(this.state.name, result.consumer_key, result.consumer_secret, result.access_token_key, result.access_token_secret));
                    }
                    else
                    {
                        state = {
                            ...state,
                            oldConsumerKey: this.props.account.consumerKey,
                            oldConsumerSecret: this.props.account.consumerSecret,
                            oldAccessTokenKey: this.props.account.accessTokenKey,
                            oldAccessTokenSecret: this.props.account.accessTokenSecret,
                            consumerKey: this.props.account.consumerKey,
                            consumerSecret: this.props.account.consumerSecret,
                            accessTokenKey: this.props.account.accessTokenKey,
                            accessTokenSecret: this.props.account.accessTokenSecret
                        };
                    }
                }
                else
                {
                    const { TWITTERACCOUNTFORM_GENERIC_ERROR } = this.props.lang;
                    this.props.dispatch(sendFailureMessage(TWITTERACCOUNTFORM_GENERIC_ERROR));
                }
                this.setState(state);
            });*/
        }
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
            consumerKey: this.state.oldConsumerKey,
            consumerSecret: this.state.oldConsumerSecret,
            accessTokenKey: this.state.oldAccessTokenKey,
            accessTokenSecret: this.state.oldAccessTokenSecret
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
        const buttonDelete = this.props.delete && !this.props.loading ? <button id="buttonDeleteMode" className="btn btn-danger" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERACCOUNTFORM_DELETE_BUTTON}</button> : undefined;
        const buttonCancel = this.props.cancel && !this.props.loading ? <button id="buttonCancel" className="btn btn-default" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CANCEL_BUTTON}</button> : undefined;
        const title = this.props.title ? <div className="panel-heading"><h3 className="panel-title">{this.props.edit ? TWITTERACCOUNTFORM_EDIT_TITLE : TWITTERACCOUNTFORM_CREATE_TITLE}</h3></div> : undefined;
        const deleteMode = this.state.deleteMode ? this.props.loading ? <LoadingCog /> : <div className="col-sm-10"><button id="buttonDeleteYes" className="btn btn-danger" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERACCOUNTFORM_DELETE_BUTTON}</button>
            <button id="buttonDeleteNo" className="btn btn-default" onClick={this.handleClick}>{TWITTERACCOUNTFORM_CANCEL_BUTTON}</button></div>
            : <div className="col-sm-10">{buttonSubmit}<div style={{ float: "right" }}>{buttonDelete}{buttonCancel}</div></div>;
        const messages = this.props.messages ? <Messages messages={this.props.messages}/> : undefined;
        return !this.state.isAccountLoaded ? <LoadingCog /> : (
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

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchAccountKeys,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TwitterAccountForm);
