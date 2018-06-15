import React, { Component } from "react";
import PropTypes from "prop-types";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import * as Language from "../../constants/Language";
import Form from "../Form";
import SuccessButton from "../buttons/SuccessButton";
import Recaptcha from "../Recaptcha";
import LoadingCog from "../LoadingCog";
import Messages from "../Messages";
import Checkbox from "../inputs/Checkbox";
import Input from "../inputs/Input";
import ListInput from "../inputs/ListInput";
import FormGroup from "../FormGroup";
import Card from "../Card";

class UserRegisterForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            USERREGISTERFORM_TITLE: PropTypes.string.isRequired,
            USERREGISTERFORM_SUBMIT: PropTypes.string.isRequired,
            USERREGISTERFORM_FIRSTNAME: PropTypes.string.isRequired,
            USERREGISTERFORM_LASTNAME: PropTypes.string.isRequired,
            USERREGISTERFORM_EMAIL: PropTypes.string.isRequired,
            USERREGISTERFORM_PASSWORD: PropTypes.string.isRequired,
            USERREGISTERFORM_CONFIRMPASSWORD: PropTypes.string.isRequired,
            USERREGISTERFORM_LANGUAGE: PropTypes.string.isRequired,
            USERREGISTERFORM_USETERMS: PropTypes.string.isRequired,
            USERREGISTERFORM_LANGUAGE_ENGLISH: PropTypes.string.isRequired,
            USERREGISTERFORM_LANGUAGE_FRENCH: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object,
        clientSide: PropTypes.bool
    };

    static defaultProps = {
        name: "register",
        onSubmit: () => {},
        title: true,
        loading: false,
        messages: undefined,
        clientSide: false
    };

    constructor(props)
    {
        super(props);
        const {
            clientSide
        } = this.props;
        this.state = {
            loading: clientSide,
            email: "",
            password: "",
            cpassword: "",
            firstname: "",
            lastname: "",
            lang: Language.ENGLISH,
            useterms: false,
            recaptcha: ""
        };
        this.handleRecaptchaVerify = this.handleRecaptchaVerify.bind(this);
        this.handleRecaptchaExpired = this.handleRecaptchaExpired.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount()
    {
        const {
            loading
        } = this.state;
        if (loading)
        {
            this.setState({
                loading: false
            });
        }
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
                lang: this.state.lang,
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
            USERREGISTERFORM_TITLE,
            USERREGISTERFORM_SUBMIT,
            USERREGISTERFORM_FIRSTNAME,
            USERREGISTERFORM_LASTNAME,
            USERREGISTERFORM_EMAIL,
            USERREGISTERFORM_PASSWORD,
            USERREGISTERFORM_CONFIRMPASSWORD,
            USERREGISTERFORM_LANGUAGE,
            USERREGISTERFORM_USETERMS,
            USERREGISTERFORM_LANGUAGE_ENGLISH,
            USERREGISTERFORM_LANGUAGE_FRENCH
        } = this.props.lang;
        const {
            messages,
            title,
            loading,
            children
        } = this.props;
        const {
            loading: mainLoading,
            firstname,
            lastname,
            email,
            password,
            cpassword,
            lang,
            useterms,
            recaptcha
        } = this.state;
        const languages = [
            {
                name: USERREGISTERFORM_LANGUAGE_ENGLISH,
                value: Language.ENGLISH
            },
            {
                name: USERREGISTERFORM_LANGUAGE_FRENCH,
                value: Language.FRENCH
            }
        ];
        return mainLoading ? (
            <Card>
                <LoadingCog center/>
            </Card>
        ) : (
            <Form title={title ? USERREGISTERFORM_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input name="firstname" id="firstname" value={firstname} label={USERREGISTERFORM_FIRSTNAME} onChange={this.handleChange} autoFocus/>
                <Input name="lastname" id="lastname" value={lastname} label={USERREGISTERFORM_LASTNAME} onChange={this.handleChange}/>
                <Input name="email" id="email" value={email} label={USERREGISTERFORM_EMAIL} onChange={this.handleChange}/>
                <Input type="password" name="password" id="password" value={password} label={USERREGISTERFORM_PASSWORD} onChange={this.handleChange}/>
                <Input type="password" name="cpassword" id="cpassword" value={cpassword} label={USERREGISTERFORM_CONFIRMPASSWORD} onChange={this.handleChange}/>
                <ListInput name="lang" id="lang" options={languages} label={USERREGISTERFORM_LANGUAGE} onChange={this.handleChange}/>
                <Checkbox id="useterms" name="useterms" label={USERREGISTERFORM_USETERMS} onChange={this.handleChange}/>
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
                            <SuccessButton className="form-button" onClick={this.handleClick} disabled={recaptcha === ""}>{USERREGISTERFORM_SUBMIT}</SuccessButton>
                        )
                    }
                    </div>
                </FormGroup>
                {children}
            </Form>
        );
    }
}

export default withProps(UserRegisterForm, [ Props.LANG ]);