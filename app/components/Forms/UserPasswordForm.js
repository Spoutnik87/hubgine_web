import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import Recaptcha from "../Recaptcha";
import Messages from "../Messages";
import Input from "../Inputs/Input";
import LoadingCog from "../LoadingCog";
import SuccessButton from "../buttons/SuccessButton";
import DefaultButton from "../buttons/DefaultButton";
import Form from "../Form";

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
        const buttonSubmit = this.props.loading ? <LoadingCog/> : <SuccessButton id="buttonSubmit" onClick={this.handleClick}>{this.props.edit ? USERPASSWORDFORM_EDIT_BUTTON : USERPASSWORDFORM_CREATE_BUTTON}</SuccessButton>;
        const buttonCancel = this.props.cancel && !this.props.loading && <DefaultButton id="buttonCancel" onClick={this.handleClick}>{USERPASSWORDFORM_CANCEL_BUTTON}</DefaultButton>;
        const messages = this.props.messages && <Messages messages={this.props.messages}/>;
        return (
            <Form title={this.props.title ? this.props.edit ? USERPASSWORDFORM_EDIT_TITLE : USERPASSWORDFORM_CREATE_TITLE : null}>
                {messages}
                <div className="form-group">
                    <label htmlFor="oldpassword" className="col-sm-2">{USERPASSWORDFORM_OLDPASSWORD}</label>
                    <div className="col-sm-10">
                        <Input type="password" name="oldpassword" id="oldpassword" className="form-control" value={this.state.oldpassword} onChange={this.handleChange} autoFocus/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-sm-2">{USERPASSWORDFORM_PASSWORD}</label>
                    <div className="col-sm-10">
                        <Input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword" className="col-sm-2">{USERPASSWORDFORM_CPASSWORD}</label>
                    <div className="col-sm-10">
                        <Input type="password" name="cpassword" id="cpassword" className="form-control" value={this.state.cpassword} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        {buttonSubmit}<div style={{ float: "right" }}>{buttonCancel}</div>
                    </div>
                </div>
                {this.props.children}
            </Form>
        );
    }
}

export default withLanguage(UserPasswordForm);