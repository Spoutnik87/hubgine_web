import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import { addAccount, updateAccount, removeAccount } from "../../actions/accounts";
import TwitterAccountForm from "../forms/TwitterAccountForm";
import AccountItem from "../AccountItem";
import SuccessButton from "../buttons/SuccessButton";

class AccountsManagment extends Component {
    static propTypes = {
        accounts: PropTypes.arrayOf(PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            consumerKey: PropTypes.string.isRequired,
            consumerSecret: PropTypes.string.isRequired,
            accessTokenKey: PropTypes.string.isRequired,
            accessTokenSecret: PropTypes.string.isRequired,
            blacklist: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
        })).isRequired,
        lang: PropTypes.shape({
            ACCOUNTSMANAGMENT_ADD_ACCOUNT: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            creationFormDisplayed: false,
            loadingAccountForm: false,
            selectedAccount: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleAccountCreationSubmit = this.handleAccountCreationSubmit.bind(this);
        this.handleAccountCreationCancel = this.handleAccountCreationCancel.bind(this);
        this.handleAccountEditionSubmit = this.handleAccountEditionSubmit.bind(this);
        this.handleAccountEditionDelete = this.handleAccountEditionDelete.bind(this);
        this.handleAccountEditionCancel = this.handleAccountEditionCancel.bind(this);
    }

    handleClick(event)
    {
        this.setState({
            creationFormDisplayed: true
        });
    }

    handleAccountChange(event)
    {
        this.setState({
            creationFormDisplayed: false,
            selectedAccount: event.target.id
        });
    }

    handleAccountCreationSubmit(event)
    {
        const {
            name,
            consumerKey,
            consumerSecret,
            accessTokenKey,
            accessTokenSecret,
            blacklist
        } = event.result;
        this.setState({
            loadingAccountForm: true
        });
        this.props.actions.addAccount(name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, blacklist).then(() => {
            this.setState({
                loadingAccountForm: false,
                creationFormDisplayed: false
            });
        }).catch(error => {
            this.setState({
                loadingAccountForm: false
            });
        });
    }

    handleAccountCreationCancel()
    {
        this.setState({
            creationFormDisplayed: false
        });
    }

    handleAccountEditionSubmit(event)
    {
        const {
            name,
            consumerKey,
            consumerSecret,
            accessTokenKey,
            accessTokenSecret,
            blacklist
        } = event.result;
        this.setState({
            loadingAccountForm: true
        });
        this.props.actions.updateAccount(event.default.name, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, blacklist).then(() => {
            this.setState({
                loadingAccountForm: false,
                selectedAccount: ""
            });
        }).catch(() => {
            this.setState({
                loadingAccountForm: false,
                selectedAccount: ""
            });
        });
    }

    handleAccountEditionDelete(event)
    {
        this.setState({
            loadingAccountForm: true
        });
        this.props.actions.removeAccount(event.default.name).then(() => {
            this.setState({
                loadingAccountForm: false
            });
        });
    }

    handleAccountEditionCancel()
    {
        this.setState({
            selectedAccount: ""
        });
    }

    render()
    {
        const {
            ACCOUNTSMANAGMENT_ADD_ACCOUNT
        } = this.props.lang;
        const {
            accounts
        } = this.props;
        const {
            creationFormDisplayed,
            selectedAccount,
            loadingAccountForm
        } = this.state;
        return creationFormDisplayed ? (
            <TwitterAccountForm cancel loading={loadingAccountForm} onCancel={this.handleAccountCreationCancel} onSubmit={this.handleAccountCreationSubmit}/>
        ) : (
            <Fragment>
                <ul className="list-group">
                    {
                        accounts.map(account => (
                            <li key={account.uid} className="list-group-item" style={{ border: "none" }}>
                            {
                                selectedAccount === account.name ? (
                                    <TwitterAccountForm account={account} loading={loadingAccountForm} cancel edit delete onCancel={this.handleAccountEditionCancel} onDelete={this.handleAccountEditionDelete} onSubmit={this.handleAccountEditionSubmit}/>
                                ) : (
                                    <AccountItem account={account} onClick={this.handleAccountChange}/>
                                )
                            }
                            </li>
                        ))
                    }
                </ul>
                <SuccessButton id="buttonSubmit" className="form-button" onClick={this.handleClick}>{ACCOUNTSMANAGMENT_ADD_ACCOUNT}</SuccessButton>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            addAccount, updateAccount, removeAccount
        }, dispatch)
    };
};

export default withProps(connect(undefined, mapDispatchToProps)(AccountsManagment), [ Props.LANG, Props.ACCOUNTS ]);