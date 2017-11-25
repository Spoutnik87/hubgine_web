import React, { Component } from "react";
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
import Panel from "../Panel";
import Form from "../Form";
import LoadingCog from "../LoadingCog";
import PrimaryButton from "../buttons/PrimaryButton";
import DefaultButton from "../buttons/DefaultButton";

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
            PROFILE_OLDPASSWORD: PropTypes.string.isRequired,
            PROFILE_PASSWORD: PropTypes.string.isRequired,
            PROFILE_CONFIRMPASSWORD: PropTypes.string.isRequired,
            PROFILE_EDIT_PASSWORD: PropTypes.string.isRequired,
            PROFILE_CONFIRMEDIT_PASSWORD: PropTypes.string.isRequired,
            PROFILE_CANCELEDIT_PASSWORD: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loadingAccountForm: false,
            isLoaded: false,
            isAccountCreationFormDisplayed: false,
            isPasswordEditionFormDisplayed: false,
            loadingEmail: false,
            loadingFirstname: false,
            loadingLastname: false,
            loadingLanguage: false,
            loadingPassword: false,
            oldpassword: "",
            password: "",
            cpassword: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAccountFormCreationCancel = this.handleAccountFormCreationCancel.bind(this);
        this.handleAccountFormCreationSubmit = this.handleAccountFormCreationSubmit.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
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
        else if (event.target.id === "buttonPasswordEditionSubmit")
        {
            this.setState({
                loadingPassword: true
            });
            this.props.actions.updateUser(null, this.state.oldpassword, this.state.password, this.state.cpassword, null, null, null).then(() => {
                this.setState({
                    loadingPassword: false,
                    isPasswordEditionFormDisplayed: false,
                    oldpassword: "",
                    password: "",
                    cpassword: ""
                });
            }).catch(error => {
                this.setState({
                    loadingPassword: false
                });
            });
        }
        else if (event.target.id === "buttonPasswordEditionCancel")
        {
            this.setState({
                isPasswordEditionFormDisplayed: false
            });
        }
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleAccountFormCreationSubmit(event)
    {
        const {
            name,
            consumerKey,
            consumerSecret,
            accessTokenKey,
            accessTokenSecret
        } = event.result;
        this.setState({
            loadingAccountForm: true
        });
        this.props.actions.addAccount(name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret).then(() => {
            this.setState({
                loadingAccountForm: false,
                isAccountCreationFormDisplayed: false
            });
        }).catch(error => {
            this.setState({
                loadingAccountForm: false
            });
        });
    }

    handleAccountFormCreationCancel()
    {
        this.setState({
            isAccountCreationFormDisplayed: false
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

    render()
    {
        let panel;
        const {
            PROFILE_TITLE,
            PROFILE_EMAIL,
            PROFILE_FIRSTNAME,
            PROFILE_LASTNAME,
            PROFILE_LANGUAGE,
            PROFILE_OLDPASSWORD,
            PROFILE_PASSWORD,
            PROFILE_CONFIRMPASSWORD,
            PROFILE_EDIT_PASSWORD,
            PROFILE_CONFIRMEDIT_PASSWORD,
            PROFILE_CANCELEDIT_PASSWORD,
            PROFILE_ACCOUNT_LIST
        } = this.props.lang;
        if (this.state.isLoaded)
        {
            panel = (
                <Container>
                    <Form title={PROFILE_TITLE}>
                        <Messages messages={this.props.messages}/>
                        <div className="form-group">
                            <label htmlFor="email" className="col-sm-2">{PROFILE_EMAIL}</label>
                            <div className="col-sm-8">
                                <TextInput name="email" value={this.props.user.email} onSubmit={this.handleSubmit} loading={this.state.loadingEmail}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname" className="col-sm-2">{PROFILE_FIRSTNAME}</label>
                            <div className="col-sm-8">
                                <TextInput name="firstname" value={this.props.user.firstname} onSubmit={this.handleSubmit} loading={this.state.loadingFirstname}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname" className="col-sm-2">{PROFILE_LASTNAME}</label>
                            <div className="col-sm-8">
                                <TextInput name="lastname" value={this.props.user.lastname} onSubmit={this.handleSubmit} loading={this.state.loadingLastname}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="language" className="col-sm-2">{PROFILE_LANGUAGE}</label>
                            <div className="col-sm-8">
                                <ListInput name="language" options={Object.values(Languages)} defaultOption={this.props.user.lang} onChange={this.handleLanguageChange} loading={this.state.loadingLanguage} />
                            </div>
                        </div>
                        {
                            this.state.loadingPassword ? (
                                <LoadingCog/>
                            ) : (
                                this.state.isPasswordEditionFormDisplayed ? (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="oldpassword" className="col-sm-2">{PROFILE_OLDPASSWORD}</label>
                                            <div className="col-sm-8">
                                                <input type="password" name="oldpassword" className="form-control" value={this.state.oldpassword} onChange={this.handleChange} autoFocus/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="col-sm-2">{PROFILE_PASSWORD}</label>
                                            <div className="col-sm-8">
                                                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cpassword" className="col-sm-2">{PROFILE_CONFIRMPASSWORD}</label>
                                            <div className="col-sm-8">
                                                <input type="password" name="cpassword" className="form-control" value={this.state.cpassword} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-10">
                                            <PrimaryButton id="buttonPasswordEditionSubmit" onClick={this.handleClick}>{PROFILE_CONFIRMEDIT_PASSWORD}</PrimaryButton>
                                            <div style={{ float: "right" }}>
                                                <DefaultButton id="buttonPasswordEditionCancel" onClick={this.handleClick}>{PROFILE_CANCELEDIT_PASSWORD}</DefaultButton>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <PrimaryButton id="buttonPasswordEdition" onClick={this.handleClick}>{PROFILE_EDIT_PASSWORD}</PrimaryButton>
                                )
                            )
                        }
                    </Form>
                    <Panel title={PROFILE_ACCOUNT_LIST}>
                        <AccountsManagment />
                    </Panel>
                </Container>
            );
        }
        else
        {
            panel = (
                <Container>
                    <Panel title={PROFILE_TITLE}>
                        <Messages messages={this.props.messages}/>
                        <LoadingCog center/>
                    </Panel>
                </Container>
            );
        }
        return panel;
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
