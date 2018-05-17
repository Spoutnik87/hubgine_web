import React, { Component } from "react";
import PropTypes from "prop-types";
import { withData } from "../withData";
import * as Data from "../../constants/Data";
import Input from "../inputs/Input";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Form from "../Form";
import SuccessButton from "../buttons/SuccessButton";
import FormGroup from "../FormGroup";
import Card from "../Card";

class UserSigninForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            USERSIGNINFORM_TITLE: PropTypes.string.isRequired,
            USERSIGNINFORM_EMAIL: PropTypes.string.isRequired,
            USERSIGNINFORM_PASSWORD: PropTypes.string.isRequired,
            USERSIGNINFORM_SUBMIT: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object,
        clientSide: PropTypes.bool
    };

    static defaultProps = {
        name: "signin",
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
            password: ""
        };
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
            USERSIGNINFORM_TITLE,
            USERSIGNINFORM_EMAIL,
            USERSIGNINFORM_PASSWORD,
            USERSIGNINFORM_SUBMIT
        } = this.props.lang;
        const {
            title,
            messages,
            loading
        } = this.props;
        const {
            loading: mainLoading,
            email,
            password
        } = this.state;
        return mainLoading ? (
            <Card>
                <LoadingCog center/>
            </Card>
        ) : (
            <Form title={title ? USERSIGNINFORM_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input id="email" name="email" value={email} label={USERSIGNINFORM_EMAIL} onChange={this.handleChange} autoFocus/>
                <Input id="password" type="password" name="password" value={password} label={USERSIGNINFORM_PASSWORD} onChange={this.handleChange}/>
                <FormGroup>
                    <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-10">
                    {
                        loading ? (
                            <LoadingCog/>
                        ) : (
                            <SuccessButton className="form-button" onClick={this.handleClick}>{USERSIGNINFORM_SUBMIT}</SuccessButton>
                        )
                    }
                    </div>
                </FormGroup>
                {this.props.children}
            </Form>
        );
    }
}

export default withData(UserSigninForm, [ Data.LANG ]);