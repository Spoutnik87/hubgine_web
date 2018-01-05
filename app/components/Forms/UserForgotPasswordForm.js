import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import Recaptcha from "../Recaptcha";
import Messages from "../Messages";
import Input from "../Inputs/Input";
import LoadingCog from "../LoadingCog";
import SuccessButton from "../buttons/SuccessButton";
import Form from "../Form";

class UserForgotPasswordForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            FORGOTPASSWORD_TITLE: PropTypes.string.isRequired,
            FORGOTPASSWORD_SUBMIT: PropTypes.string.isRequired,
            FORGOTPASSWORD_EMAIL: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "userforgotpassword",
        onSubmit: () => {},
        title: true,
        loading: false,
        messages: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            recaptcha: ""
        };
        this.handleRecaptchaVerify = this.handleRecaptchaVerify.bind(this);
        this.handleRecaptchaExpired = this.handleRecaptchaExpired.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleRecaptchaVerify(response)
    {
        this.setState({
            recaptcha: response
        });
    }

    handleRecaptchaExpired()
    {
        this.setState({
            recaptcha: ""
        });
    }

    handleClick(event)
    {
        this.props.onSubmit({
            name: this.props.name,
            result: {
                email: this.state.email,
                recaptcha: this.state.recaptcha
            }
        });
    }

    handleChange(event)
    {
        this.setState({
            [event.name]: event.value
        });
    }

    render()
    {
        const {
            FORGOTPASSWORD_TITLE,
            FORGOTPASSWORD_EMAIL,
            FORGOTPASSWORD_SUBMIT
        } = this.props.lang;
        const buttonSubmit = this.props.loading ? <LoadingCog/> : <SuccessButton onClick={this.handleClick} disabled={this.state.recaptcha === ""}>{FORGOTPASSWORD_SUBMIT}</SuccessButton>;
        const messages = this.props.messages && <Messages messages={this.props.messages}/>;
        return (
            <Form title={this.props.title ? FORGOTPASSWORD_TITLE : null}>
                {messages}
                <div className="form-group">
                    <label htmlFor="email" className="col-sm-2">{FORGOTPASSWORD_EMAIL}</label>
                    <div className="col-sm-10">
                        <Input name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2"></label>
                    <div className="col-sm-10">
                        <Recaptcha verifyCallback={this.handleRecaptchaVerify} expiredCallback={this.handleRecaptchaExpired} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        {buttonSubmit}
                    </div>
                </div>
                {this.props.children}
            </Form>
        );
    }
}

export default withLanguage(UserForgotPasswordForm);