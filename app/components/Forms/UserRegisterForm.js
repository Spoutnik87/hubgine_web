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
        const submitButton = this.props.loading ? <LoadingCog/> : <SuccessButton onClick={this.handleClick} disabled={this.state.recaptcha === ""}>{REGISTER_SUBMIT}</SuccessButton>
        const messages = this.props.messages && <Messages messages={this.props.messages}/>;
        return (
            <Form title={this.props.title ? REGISTER_TITLE : null}>
                {messages}
                <div className="form-group">
                    <label htmlFor="firstname" className="col-sm-2">{REGISTER_FIRSTNAME}</label>
                    <div className="col-sm-10">
                        <Input name="firstname" id="firstname" className="form-control" value={this.state.firstname} onChange={this.handleChange} autoFocus/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname" className="col-sm-2">{REGISTER_LASTNAME}</label>
                    <div className="col-sm-10">
                        <Input name="lastname" id="lastname" className="form-control" value={this.state.lastname} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-sm-2">{REGISTER_EMAIL}</label>
                    <div className="col-sm-10">
                        <Input name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-sm-2">{REGISTER_PASSWORD}</label>
                    <div className="col-sm-10">
                        <Input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword" className="col-sm-2">{REGISTER_CONFIRMPASSWORD}</label>
                    <div className="col-sm-10">
                        <Input type="password" name="cpassword" id="cpassword" className="form-control" value={this.state.cpassword} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lang" className="col-sm-2">{REGISTER_LANGUAGE}</label>
                    <div className="col-sm-10">
                        <ListInput name="lang" onChange={this.handleChange} options={Object.keys(Languages)} defaultOption={"ENGLISH"}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="useterms" className="col-sm-2">{REGISTER_USETERMS}</label>
                    <div className="col-sm-10">
                        <Checkbox name="useterms" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="recaptcha" className="col-sm-2"></label>
                    <div className="col-sm-10">
                        <Recaptcha verifyCallback={this.handleRecaptchaVerify} expiredCallback={this.handleRecaptchaExpired} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        {submitButton}
                    </div>
                </div>
                {this.props.children}
            </Form>
        );
    }
}

export default withLanguage(UserRegisterForm);