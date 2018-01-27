import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import { withMessages } from "../withMessages";
import { fetchUser, updateUser } from "../../actions/user";
import { addAccount } from "../../actions/accounts";
import * as Ranks from "../../constants/Ranks";
import * as Languages from "../../constants/Languages";
import Messages from "../Messages";
import TextInput from "../Inputs/TextInput";
import ListInput from "../Inputs/ListInput";
import AccountsManagment from "./AccountsManagment";
import Container from "../Container";
import Card from "../Card";
import Form from "../Form";
import UserPasswordForm from "../Forms/UserPasswordForm";
import LoadingCog from "../LoadingCog";
import PrimaryButton from "../buttons/PrimaryButton";

class Profile extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        accounts: PropTypes.shape({
            data: PropTypes.array.isRequired
        }).isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
            rank: PropTypes.oneOf(Object.values(Ranks)).isRequired,
            lang: PropTypes.oneOf(Object.values(Languages)).isRequired,
            firstname: PropTypes.string,
            lastname: PropTypes.string
        }).isRequired,
        lang: PropTypes.shape({
            PROFILE_TITLE: PropTypes.string.isRequired,
            PROFILE_ACCOUNT_LIST: PropTypes.string.isRequired,
            PROFILE_EMAIL: PropTypes.string.isRequired,
            PROFILE_FIRSTNAME: PropTypes.string.isRequired,
            PROFILE_LASTNAME: PropTypes.string.isRequired,
            PROFILE_LANGUAGE: PropTypes.string.isRequired,
            PROFILE_EDIT_PASSWORD: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false,
            isAccountCreationFormDisplayed: false,
            isPasswordEditionFormDisplayed: false,
            loadingEmail: false,
            loadingFirstname: false,
            loadingLastname: false,
            loadingLanguage: false,
            loadingPassword: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleUserPasswordEditionSubmit = this.handleUserPasswordEditionSubmit.bind(this);
        this.handleUserPasswordEditionCancel = this.handleUserPasswordEditionCancel.bind(this);
    }

    componentDidMount()
    {
        const { PROFILE_ERRORLOADING_USER, PROFILE_ERRORLOADING_ACCOUNTLIST } = this.props.lang;
        this.props.actions.fetchUser().then(() => {
            this.setState({
                isLoaded: true,
                email: this.props.user.email,
                firstname: this.props.user.firstname,
                lastname: this.props.user.lastname
            });
        });
    }

    handleSubmit(input)
    {
        if (input.name === "email")
        {
            this.setState({
                loadingEmail: true
            });
            this.props.actions.updateUser(input.value, null, null, null, null, null, null).then(() => {
                this.setState({
                    loadingEmail: false
                });
            }).catch(error => {
                this.setState({
                    loadingEmail: false
                });
            });
        }
        else if (input.name === "firstname")
        {
            this.setState({
                loadingFirstname: true
            });
            this.props.actions.updateUser(null, null, null, null, input.value, null, null).then(() => {
                this.setState({
                    loadingFirstname: false
                });
            }).catch(error => {
                this.setState({
                    loadingFirstname: false
                });
            });
        }
        else if (input.name === "lastname")
        {
            this.setState({
                loadingLastname: true
            });
            this.props.actions.updateUser(null, null, null, null, null, input.value, null).then(() => {
                this.setState({
                    loadingLastname: false
                });
            }).catch(error => {
                this.setState({
                    loadingLastname: false
                });
            });
        }
    }

    handleClick(event)
    {
        if (event.target.id === "buttonAccountCreation")
        {
            this.setState({
                isAccountCreationFormDisplayed: true
            });
        }
        else if (event.target.id === "buttonPasswordEdition")
        {
            this.setState({
                isPasswordEditionFormDisplayed: true
            });
        }
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleLanguageChange(event)
    {
        this.setState({
            loadingLanguage: true
        });
        this.props.actions.updateUser(null, null, null, null, null, null, event.value).then(() => {
            this.setState({
                loadingLanguage: false
            });
        }).catch(error => {
            this.setState({
                loadingLanguage: false
            });
        });
    }

    handleUserPasswordEditionSubmit(event)
    {
        this.setState({
            loadingPassword: true
        });
        const {
            oldpassword,
            password,
            cpassword
        } = event.result;
        this.props.actions.updateUser(null, oldpassword, password, cpassword, null, null, null).then(() => {
            this.setState({
                loadingPassword: false,
                isPasswordEditionFormDisplayed: false
            });
        }).catch(error => {
            this.setState({
                loadingPassword: false
            });
        });
    }

    handleUserPasswordEditionCancel()
    {
        this.setState({
            isPasswordEditionFormDisplayed: false
        });
    }

    render()
    {
        const {
            PROFILE_TITLE,
            PROFILE_EMAIL,
            PROFILE_FIRSTNAME,
            PROFILE_LASTNAME,
            PROFILE_LANGUAGE,
            PROFILE_EDIT_PASSWORD,
            PROFILE_ACCOUNT_LIST
        } = this.props.lang;
        const { messages, user } = this.props;
        const { isLoaded, loadingPassword, isPasswordEditionFormDisplayed, loadingEmail, loadingFirstname, loadingLastname, loadingLanguage } = this.state;
        return (
            <Container>
            {
                isLoaded ? (
                    <Fragment>
                        <Form title={PROFILE_TITLE}>
                            <Messages messages={messages}/>
                            <TextInput name="email" value={user.email} id="email" label={PROFILE_EMAIL} onSubmit={this.handleSubmit} loading={loadingEmail}/>
                            <TextInput name="firstname" value={user.firstname} id="firstname" label={PROFILE_FIRSTNAME} onSubmit={this.handleSubmit} loading={loadingFirstname}/>
                            <TextInput name="lastname" value={user.lastname} id="lastname" label={PROFILE_LASTNAME} onSubmit={this.handleSubmit} loading={loadingLastname}/>
                            <ListInput name="language" id="language" label={PROFILE_LANGUAGE} options={Object.values(Languages)} defaultOption={user.lang} loading={loadingLanguage} onChange={this.handleLanguageChange}/>
                            {
                                loadingPassword ? (
                                    <LoadingCog/>
                                ) : (
                                    isPasswordEditionFormDisplayed ? (
                                        <UserPasswordForm cancel edit title onSubmit={this.handleUserPasswordEditionSubmit} onCancel={this.handleUserPasswordEditionCancel}/>
                                    ) : (
                                        <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-2 col-md-10">
                                            <PrimaryButton id="buttonPasswordEdition" style={{ width: "100%" }} onClick={this.handleClick}>{PROFILE_EDIT_PASSWORD}</PrimaryButton>
                                        </div>
                                    )
                                )
                            }
                        </Form>
                        <Card title={PROFILE_ACCOUNT_LIST}>
                            <AccountsManagment />
                        </Card>
                    </Fragment>
                ) : (
                    <Card title={PROFILE_TITLE}>
                        <Messages messages={messages}/>
                        <LoadingCog center/>
                    </Card>
                )
            }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        accounts: state.accounts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchUser, addAccount, updateUser
        }, dispatch)
    };
};

export default withMessages(withLanguage(connect(mapStateToProps, mapDispatchToProps)(Profile)));
