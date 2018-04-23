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
import ListInput from "../Inputs/ListInput";
import TextAreaInput from "../Inputs/TextAreaInput";
import * as ContactType from "../../constants/ContactType";

class ContactForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            CONTACTFORM_TITLE: PropTypes.string.isRequired,
            CONTACTFORM_REASON: PropTypes.string.isRequired,
            CONTACTFORM_EMAIL: PropTypes.string.isRequired,
            CONTACTFORM_MESSAGE: PropTypes.string.isRequired,
            CONTACTFORM_SUBMIT: PropTypes.string.isRequired,
            CONTACTFORM_REASON_GENERAL: PropTypes.string.isRequired,
            CONTACTFORM_REASON_PROPOSITION: PropTypes.string.isRequired,
            CONTACTFORM_REASON_BUG: PropTypes.string.isRequired,
            CONTACTFORM_REASON_INFORMATION: PropTypes.string.isRequired,
            CONTACTFORM_REASON_OTHER: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "contact",
        onSubmit: () => {},
        title: true,
        loading: false,
        messages: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
            reason: ContactType.GENERAL,
            email: "",
            message: "",
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
        const {
            CONTACTFORM_REASON_GENERAL,
            CONTACTFORM_REASON_PROPOSITION,
            CONTACTFORM_REASON_BUG,
            CONTACTFORM_REASON_INFORMATION,
            CONTACTFORM_REASON_OTHER
        } = this.props.lang;
        const {
            name
        } = this.props;
        const {
            reason,
            email,
            message,
            recaptcha
        } = this.state;
        this.props.onSubmit({
            name: name,
            result: {
                reason: reason,
                email: email,
                message: message,
                recaptcha: recaptcha
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
            CONTACTFORM_TITLE,
            CONTACTFORM_REASON,
            CONTACTFORM_EMAIL,
            CONTACTFORM_MESSAGE,
            CONTACTFORM_SUBMIT,
            CONTACTFORM_REASON_GENERAL,
            CONTACTFORM_REASON_PROPOSITION,
            CONTACTFORM_REASON_BUG,
            CONTACTFORM_REASON_INFORMATION,
            CONTACTFORM_REASON_OTHER
        } = this.props.lang;
        const {
            loading,
            title,
            messages,
            children
        } = this.props;
        const {
            reason,
            email,
            message,
            recaptcha
        } = this.state;
        const reasons = [
            {
                name: CONTACTFORM_REASON_GENERAL,
                value: ContactType.GENERAL
            },
            {
                name: CONTACTFORM_REASON_PROPOSITION,
                value: ContactType.PROPOSITION
            },
            {
                name: CONTACTFORM_REASON_BUG,
                value: ContactType.BUG
            },
            {
                name: CONTACTFORM_REASON_INFORMATION,
                value: ContactType.INFORMATION
            },
            {
                name: CONTACTFORM_REASON_OTHER,
                value: ContactType.OTHER
            }
        ];
        return (
            <Form title={title ? CONTACTFORM_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <ListInput name="reason" value={reason} options={reasons} label={CONTACTFORM_REASON} onChange={this.handleChange} autoFocus/>
                <Input name="email" value={email} label={CONTACTFORM_EMAIL} onChange={this.handleChange}/>
                <TextAreaInput name="message" value={message} label={CONTACTFORM_MESSAGE} rows={10} onChange={this.handleChange}/>
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
                            <SuccessButton className="form-button" onClick={this.handleClick} disabled={recaptcha === ""}>{CONTACTFORM_SUBMIT}</SuccessButton>
                        </div>
                    )
                }
                </FormGroup>
                {children}
            </Form>
        );
    }
}

export default withLanguage(ContactForm);