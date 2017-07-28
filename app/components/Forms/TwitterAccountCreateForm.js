import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingCog from "../LoadingCog";
import Messages from "../Messages";

class TwitterAccountCreateForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            TWITTERACCOUNTFORM_NAME: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERKEY: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_CONSUMERSECRET: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY: PropTypes.string.isRequired,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET: PropTypes.string.isRequired,
            TWITTERACCOUNTCREATEFORM_TITLE: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        cancel: PropTypes.bool,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "twitteraccountcreate",
        onSubmit: () => {},
        onCancel: () => {},
        cancel: false,
        title: true,
        loading: false,
        messages: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
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
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleClick(event)
    {
        if (event.target.id === "buttonSubmit")
        {
            this.props.onSubmit({
                name: this.props.name,
                result: {
                    name: this.state.name,
                    consumerKey: this.state.consumerKey,
                    consumerSecret: this.state.consumerSecret,
                    accessTokenKey: this.state.accessTokenKey,
                    accessTokenSecret: this.state.accessTokenSecret
                }
            });
        }
        else if (event.target.id === "buttonCancel")
        {
            this.props.onCancel({
                name: this.props.name,
                result: {
                    name: this.state.name,
                    consumerKey: this.state.consumerKey,
                    consumerSecret: this.state.consumerSecret,
                    accessTokenKey: this.state.accessTokenKey,
                    accessTokenSecret: this.state.accessTokenSecret
                }
            });
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
        const buttonSubmit = this.props.loading ? <LoadingCog/> : <button id="buttonSubmit" className="btn btn-success" onClick={this.handleClick}>Submit</button>;
        const buttonCancel = this.props.cancel && !this.props.loading ? <button id="buttonCancel" className="btn btn-default" onClick={this.handleClick}>Cancel</button> : undefined
        const title = this.props.title ? <div className="panel-heading"><h3 className="panel-title">{TWITTERACCOUNTCREATEFORM_TITLE}</h3></div> : undefined;
        const messages = this.props.messages ? <Messages messages={this.props.messages}/> : undefined;
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
                        <div className="col-sm-10">
                            {buttonSubmit}
                            <div style={{ float: "right" }}>
                                {buttonCancel}
                            </div>
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(TwitterAccountCreateForm);