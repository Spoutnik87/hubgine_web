import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import validator from "validator";
import PropTypes from "prop-types";
import { getUser, updateUser, getAccountList } from "../util/api";
import { sendFailureMessage, sendSuccessMessage, clearMessages } from "../actions/messages";
import { updateInfos, updateEmail, updateFirstname, updateLastname } from "../actions/user";
import { updateAccountList } from "../actions/accounts";
import * as Ranks from "../constants/Ranks";
import * as Languages from "../constants/Languages";
import Messages from "./Messages";
import AutoInputText from "./AutoInputText";
import AccountEditForm from "./AccountEditForm";
import LoadingCog from "./LoadingCog";

class Profile extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        accounts: PropTypes.object.isRequired,
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
            PROFILE_ERROR_GENERIC: PropTypes.string.isRequired,
            PROFILE_ERRORLOADING_USER: PropTypes.string.isRequired,
            PROFILE_ERRORLOADING_ACCOUNTLIST: PropTypes.string.isRequired,
            PROFILE_ERROREDITING_EMAIL: PropTypes.string.isRequired,
            PROFILE_SUCCESSEDITING_EMAIL: PropTypes.string.isRequired,
            PROFILE_ERROREDITING_FIRSTNAME: PropTypes.string.isRequired,
            PROFILE_SUCCESSEDITING_FIRSTNAME: PropTypes.string.isRequired,
            PROFILE_ERROREDITING_LASTNAME: PropTypes.string.isRequired,
            PROFILE_SUCCESSEDITING_LASTNAME: PropTypes.string.isRequired,
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false,
            isAccountListLoaded: false,
            loadingEmail: false,
            loadingFirstname: false,
            loadingLastname: false
        };
        this.onValidate = this.onValidate.bind(this);
    }

    componentDidMount()
    {
        const { PROFILE_ERRORLOADING_USER, PROFILE_ERRORLOADING_ACCOUNTLIST } = this.props.lang;
        getUser(this.props.user.email, this.props.user.token, (error, result) => {
            if (!error)
            {
                this.props.dispatch(updateInfos(result.email, result.first_name, result.last_name));
                this.setState({ isLoaded: true, email: result.email, firstname: result.first_name, lastname: result.last_name });
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERRORLOADING_USER }]));
            }
        });
        getAccountList(this.props.user.email, this.props.user.token, (error, result) => {
            if (!error)
            {
                this.props.dispatch(updateAccountList(result.accounts, result.length));                
                this.setState({ isAccountListLoaded: true });
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERRORLOADING_ACCOUNTLIST }]));
            }
        });
    }

    componentWillUnmount()
    {
        this.props.dispatch(clearMessages());
    }

    onValidate(input)
    {
        const { PROFILE_ERROR_GENERIC, PROFILE_SUCCESSEDITING_EMAIL, PROFILE_ERROREDITING_EMAIL,
            PROFILE_SUCCESSEDITING_FIRSTNAME, PROFILE_ERROREDITING_FIRSTNAME, PROFILE_SUCCESSEDITING_LASTNAME, PROFILE_ERROREDITING_LASTNAME } = this.props.lang;
        if (input.name === "email")
        {
            if (validator.isEmail(input.value) && !validator.isEmpty(input.value))
            {
                if (input.value !== this.props.user.email)
                {
                    this.setState({ loadingEmail: true });
                    updateUser(this.props.user.email, this.props.user.token, "email", input.value, (error, result) => {
                        this.setState({ loadingEmail: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage([{ msg: PROFILE_SUCCESSEDITING_EMAIL }]));
                            this.props.dispatch(updateEmail(input.value));
                            this.props.cookies.set("user", { token: this.props.user.token, email: this.props.user.email, rank: this.props.user.rank, lang: Languages.ENGLISH });
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERROR_GENERIC }]));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERROREDITING_EMAIL }]));
            }
        }
        else if (input.name === "firstname")
        {
            if (!validator.isEmpty(input.value))
            {
                if (input.value !== this.props.user.firstname)
                {
                    this.setState({ loadingFirstname: true });
                    updateUser(this.props.user.email, this.props.user.token, "first_name", input.value, (error, result) => {
                        this.setState({ loadingFirstname: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage([{ msg: PROFILE_SUCCESSEDITING_FIRSTNAME }]));
                            this.props.dispatch(updateFirstname(input.value));
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERROR_GENERIC }]));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERROREDITING_FIRSTNAME }]));
            }
        }
        else if (input.name === "lastname")
        {
            if (!validator.isEmpty(input.value))
            {
                if (input.value !== this.props.user.lastname)
                {
                    this.setState({
                        loadingLastname: true
                    });
                    updateUser(this.props.user.email, this.props.user.token, "last_name", input.value, (error, result) => {
                        this.setState({ loadingLastname: false });
                        if (!error)
                        {
                            this.props.dispatch(sendSuccessMessage([{ msg: PROFILE_SUCCESSEDITING_LASTNAME }]));
                            this.props.dispatch(updateLastname(input.value));
                        }
                        else
                        {
                            this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERROR_GENERIC }]));
                        }
                    });
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: PROFILE_ERROREDITING_LASTNAME }]));
            }
        }
        else if (input.name === "account")
        {
            this.setState({
                isAccountListLoaded: false
            });
            if (input.values.name)
            {
                if (!validator.isEmpty(input.values.name))
                {

                }
            }
            if (input.values.consumerKey)
            {
                if (!validator.isEmpty(input.values.consumerKey))
                {
                    
                }
            }
            if (input.values.consumerSecret)
            {

            }
            if (input.values.accessTokenKey)
            {

            }
            if (input.values.accessTokenSecret)
            {

            }
        }
    }

    render()
    {
        let panel;
        let accountList;
        const { PROFILE_TITLE, PROFILE_EMAIL, PROFILE_FIRSTNAME, PROFILE_LASTNAME, PROFILE_ACCOUNT_LIST } = this.props.lang;
        if (this.state.isAccountListLoaded)
        {
            accountList = (
                <ul className="list-group">
                    {this.props.accounts.list.map(
                        (account, index) => (
                            <li key={index} className="list-group-item"><AccountEditForm className="list-group-item" id={index} name={account.name} /></li>
                        )
                    )}
                </ul>
            );
        }
        if (this.state.isLoaded && this.state.isAccountListLoaded)
        {
            const emailInput = !this.state.loadingEmail ?
                <AutoInputText name="email" value={this.props.user.email} onValidate={this.onValidate}/> : <LoadingCog/>;
            const firstnameInput = !this.state.loadingFirstname ?
                <AutoInputText name="firstname" value={this.props.user.firstname} onValidate={this.onValidate}/> : <LoadingCog/>;
            const lastnameInput = !this.state.loadingLastname ?
                <AutoInputText name="lastname" value={this.props.user.lastname} onValidate={this.onValidate}/> : <LoadingCog/>;
            panel = (
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{PROFILE_TITLE}</h3>
                    </div>
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-2">{PROFILE_EMAIL}</label>
                                <div className="col-sm-8">
                                    {emailInput}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname" className="col-sm-2">{PROFILE_FIRSTNAME}</label>
                                <div className="col-sm-8">
                                    {firstnameInput}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname" className="col-sm-2">{PROFILE_LASTNAME}</label>
                                <div className="col-sm-8">
                                    {lastnameInput}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-heading">
                        <h3 className="panel-title">{PROFILE_ACCOUNT_LIST}</h3>
                    </div>
                    <div className="panel-body">
                        {accountList}
                    </div>
                </div>
            );
        }
        else
        {
            panel = (
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{PROFILE_TITLE}</h3>
                    </div>
                    <div className="panel-body" style={ { textAlign: "center" } }>
                        <Messages messages={this.props.messages}/>
                        <LoadingCog/>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                {panel}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        messages: state.messages,
        lang: state.lang,
        accounts: state.accounts
    };
};

export default withCookies(connect(mapStateToProps)(Profile));