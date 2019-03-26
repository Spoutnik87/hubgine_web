import React, { Component } from "react";
import PropTypes from "prop-types";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import Recaptcha from "../Recaptcha";
import Messages from "../Messages";
import Input from "../inputs/Input";
import LoadingCog from "../LoadingCog";
import SuccessButton from "../buttons/SuccessButton";
import Form from "../Form";
import FormGroup from "../FormGroup";
import Card from "../Card";

class UserForgotPasswordForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            USERFORGOTPASSWORDFORM_TITLE: PropTypes.string.isRequired,
            USERFORGOTPASSWORDFORM_SUBMIT: PropTypes.string.isRequired,
            USERFORGOTPASSWORDFORM_EMAIL: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object,
        clientSide: PropTypes.bool
    };

    static defaultProps = {
        name: "userforgotpassword",
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
            USERFORGOTPASSWORDFORM_TITLE,
            USERFORGOTPASSWORDFORM_EMAIL,
            USERFORGOTPASSWORDFORM_SUBMIT
        } = this.props.lang;
        const {
            loading,
            title,
            messages,
            children
        } = this.props;
        const {
            loading: mainLoading,
            email,
            recaptcha
        } = this.state;
        return mainLoading ? (
            <Card>
                <LoadingCog center/>
            </Card>
        ) : (
            <Form title={title ? USERFORGOTPASSWORDFORM_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input name="email" value={email} label={USERFORGOTPASSWORDFORM_EMAIL} onChange={this.handleChange} autoFocus/>
                <FormGroup>
                    <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-2">
                        <Recaptcha verifyCallback={this.handleRecaptchaVerify} expiredCallback={this.handleRecaptchaExpired}/>
                    </div>
                </FormGroup>
                <FormGroup>
                {
                    loading ? (
                        <LoadingCog/>
                    ) : (
                        <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-10">
                            <SuccessButton className="form-button" onClick={this.handleClick} disabled={recaptcha === ""}>{USERFORGOTPASSWORDFORM_SUBMIT}</SuccessButton>
                        </div>
                    )
                }
                </FormGroup>
                {children}
            </Form>
        );
    }
}

export default withProps(UserForgotPasswordForm, [ Props.LANG ]);