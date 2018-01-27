import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import Input from "../Inputs/Input";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Form from "../Form";
import SuccessButton from "../buttons/SuccessButton";
import FormGroup from "../FormGroup";

class UserSigninForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            SIGNIN_TITLE: PropTypes.string.isRequired,
            SIGNIN_EMAIL: PropTypes.string.isRequired,
            SIGNIN_PASSWORD: PropTypes.string.isRequired,
            SIGNIN_SUBMIT: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "signin",
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
            password: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event)
    {
        this.props.onSubmit({
            name: this.props.name,
            result: {
                email: this.state.email,
                password: this.state.password
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
            SIGNIN_TITLE,
            SIGNIN_EMAIL,
            SIGNIN_PASSWORD,
            SIGNIN_SUBMIT
        } = this.props.lang;
        const { title, messages, loading } = this.props;
        const { email, password } = this.state;
        return (
            <Form title={title ? SIGNIN_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input id="email" name="email" value={email} label={SIGNIN_EMAIL} onChange={this.handleChange} autoFocus/>
                <Input id="password" type="password" name="password" value={password} label={SIGNIN_PASSWORD} onChange={this.handleChange}/>
                <FormGroup>
                    <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-10">
                    {
                        loading ? (
                            <LoadingCog/>
                        ) : (
                            <SuccessButton className="form-button" onClick={this.handleClick}>{SIGNIN_SUBMIT}</SuccessButton>
                        )
                    }
                    </div>
                </FormGroup>
                {this.props.children}
            </Form>
        );
    }
}

export default withLanguage(UserSigninForm);