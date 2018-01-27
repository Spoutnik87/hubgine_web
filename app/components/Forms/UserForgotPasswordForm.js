import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import Recaptcha from "../Recaptcha";
import Messages from "../Messages";
import Input from "../Inputs/Input";
import LoadingCog from "../LoadingCog";
import SuccessButton from "../buttons/SuccessButton";
import Form from "../Form";
import FormGroup from "../FormGroup";

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
        const { loading, title, messages, children } = this.props;
        const { email, recaptcha } = this.state;
        return (
            <Form title={title ? FORGOTPASSWORD_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input name="email" id="email" value={email} label={FORGOTPASSWORD_EMAIL} onChange={this.handleChange} autoFocus/>
                <FormGroup>
                    <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-2">
                        <Recaptcha verifyCallback={this.handleRecaptchaVerify} expiredCallback={this.handleRecaptchaExpired} />
                    </div>
                </FormGroup>
                <FormGroup>
                {
                    loading ? (
                        <LoadingCog/>
                    ) : (
                        <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-10">
                            <SuccessButton className="form-button" onClick={this.handleClick} disabled={recaptcha === ""}>{FORGOTPASSWORD_SUBMIT}</SuccessButton>
                        </div>
                    )
                }
                </FormGroup>
                {children}
            </Form>
        );
    }
}

export default withLanguage(UserForgotPasswordForm);