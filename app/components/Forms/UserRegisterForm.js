import React, { Component } from "react";
import PropTypes from "prop-types";
import { invert } from "lodash";
import { withLanguage } from "../withLanguage";
import * as Languages from "../../constants/Languages";
import Form from "../Form";
import SuccessButton from "../buttons/SuccessButton";
import Recaptcha from "../Recaptcha";
import LoadingCog from "../LoadingCog";
import Messages from "../Messages";
import Checkbox from "../Inputs/Checkbox";
import Input from "../Inputs/Input";
import ListInput from "../Inputs/ListInput";
import FormGroup from "../FormGroup";

class UserRegisterForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            REGISTER_TITLE: PropTypes.string.isRequired,
            REGISTER_SUBMIT: PropTypes.string.isRequired,
            REGISTER_FIRSTNAME: PropTypes.string.isRequired,
            REGISTER_LASTNAME: PropTypes.string.isRequired,
            REGISTER_EMAIL: PropTypes.string.isRequired,
            REGISTER_PASSWORD: PropTypes.string.isRequired,
            REGISTER_CONFIRMPASSWORD: PropTypes.string.isRequired,
            REGISTER_LANGUAGE: PropTypes.string.isRequired,
            REGISTER_USETERMS: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "register",
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
            password: "",
            cpassword: "",
            firstname: "",
            lastname: "",
            lang: Object.keys(Languages)[1],
            useterms: false,
            recaptcha: ""
        };
        this.handleRecaptchaVerify = this.handleRecaptchaVerify.bind(this);
        this.handleRecaptchaExpired = this.handleRecaptchaExpired.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event)
    {
        this.props.onSubmit({
            name: this.props.name,
            result: {
                email: this.state.email,
                password: this.state.password,
                cpassword: this.state.cpassword,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                lang: Languages[this.state.lang],
                useterms: this.state.useterms,
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

    render()
    {
        const {
            REGISTER_SUBMIT,
            REGISTER_TITLE,
            REGISTER_FIRSTNAME,
            REGISTER_LASTNAME,
            REGISTER_EMAIL,
            REGISTER_PASSWORD,
            REGISTER_CONFIRMPASSWORD,
            REGISTER_LANGUAGE,
            REGISTER_USETERMS
        } = this.props.lang;
        const { messages, title, loading, children } = this.props;
        const { firstname, lastname, email, password, cpassword, lang, useterms, recaptcha } = this.state;
        return (
            <Form title={title ? REGISTER_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input name="firstname" id="firstname" value={firstname} label={REGISTER_FIRSTNAME} onChange={this.handleChange} autoFocus/>
                <Input name="lastname" id="lastname" value={lastname} label={REGISTER_LASTNAME} onChange={this.handleChange}/>
                <Input name="email" id="email" value={email} label={REGISTER_EMAIL} onChange={this.handleChange}/>
                <Input type="password" name="password" id="password" value={password} label={REGISTER_PASSWORD} onChange={this.handleChange}/>
                <Input type="password" name="cpassword" id="cpassword" value={cpassword} label={REGISTER_CONFIRMPASSWORD} onChange={this.handleChange}/>
                <ListInput name="lang" id="lang" options={Object.keys(Languages)} defaultOption="ENGLISH" label={REGISTER_LANGUAGE} onChange={this.handleChange}/>
                <Checkbox id="useterms" name="useterms" label={REGISTER_USETERMS} onChange={this.handleChange}/>
                <FormGroup>
                    <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-2">
                        <Recaptcha verifyCallback={this.handleRecaptchaVerify} expiredCallback={this.handleRecaptchaExpired}/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-10">
                    {
                        loading ? (
                            <LoadingCog/>
                        ) : (
                            <SuccessButton className="form-button" onClick={this.handleClick} disabled={recaptcha === ""}>{REGISTER_SUBMIT}</SuccessButton>
                        )
                    }
                    </div>
                </FormGroup>
                {children}
            </Form>
        );
    }
}

export default withLanguage(UserRegisterForm);