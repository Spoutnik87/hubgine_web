import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import Recaptcha from "../Recaptcha";
import Messages from "../Messages";
import Input from "../Inputs/Input";
import LoadingCog from "../LoadingCog";
import SuccessButton from "../buttons/SuccessButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Form from "../Form";
import FormGroup from "../FormGroup";

class UserPasswordForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            USERPASSWORDFORM_CREATE_TITLE: PropTypes.string.isRequired,
            USERPASSWORDFORM_EDIT_TITLE: PropTypes.string.isRequired,
            USERPASSWORDFORM_CREATE_BUTTON: PropTypes.string.isRequired,
            USERPASSWORDFORM_EDIT_BUTTON: PropTypes.string.isRequired,
            USERPASSWORDFORM_CANCEL_BUTTON: PropTypes.string.isRequired,
            USERPASSWORDFORM_OLDPASSWORD: PropTypes.string.isRequired,
            USERPASSWORDFORM_PASSWORD: PropTypes.string.isRequired,
            USERPASSWORDFORM_CPASSWORD: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        cancel: PropTypes.bool,
        onCancel: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        edit: PropTypes.bool,
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "userpassword",
        onSubmit: () => {},
        title: true,
        loading: false,
        messages: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
            oldpassword: "",
            password: "",
            cpassword: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event)
    {
        const send = {
            name: this.props.name,
            result: {
                oldpassword: this.state.oldpassword,
                password: this.state.password,
                cpassword: this.state.cpassword
            }
        };
        if (event.target.id === "buttonSubmit")
        {
            this.props.onSubmit(send);
        }
        else if (event.target.id === "buttonCancel")
        {
            this.props.onCancel(send);
        }
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
            USERPASSWORDFORM_CREATE_TITLE,
            USERPASSWORDFORM_EDIT_TITLE,
            USERPASSWORDFORM_CREATE_BUTTON,
            USERPASSWORDFORM_EDIT_BUTTON,
            USERPASSWORDFORM_CANCEL_BUTTON,
            USERPASSWORDFORM_OLDPASSWORD,
            USERPASSWORDFORM_PASSWORD,
            USERPASSWORDFORM_CPASSWORD
        } = this.props.lang;
        const { title, loading, cancel, edit, messages, children } = this.props;
        const { oldpassword, password, cpassword } = this.state;
        return (
            <Form title={title ? edit ? USERPASSWORDFORM_EDIT_TITLE : USERPASSWORDFORM_CREATE_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input type="password" name="oldpassword" id="oldpassword" value={oldpassword} label={USERPASSWORDFORM_OLDPASSWORD} onChange={this.handleChange} autoFocus/>                
                <Input type="password" name="password" id="password" value={password} label={USERPASSWORDFORM_PASSWORD} onChange={this.handleChange}/>
                <Input type="password" name="cpassword" id="cpassword" value={cpassword} label={USERPASSWORDFORM_CPASSWORD} onChange={this.handleChange}/>
                <FormGroup>
                {
                    loading ? (
                        <LoadingCog/>
                    ) : (
                        <Fragment>
                            <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-10">
                                <SuccessButton id="buttonSubmit" className="form-button" onClick={this.handleClick}>{edit ? USERPASSWORDFORM_EDIT_BUTTON : USERPASSWORDFORM_CREATE_BUTTON}</SuccessButton>
                            </div>
                            <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-10">
                                <SecondaryButton id="buttonCancel" className="form-button" onClick={this.handleClick}>{USERPASSWORDFORM_CANCEL_BUTTON}</SecondaryButton>
                            </div>
                        </Fragment>
                    )
                }
                </FormGroup>
                {children}
            </Form>
        );
    }
}

export default withLanguage(UserPasswordForm);