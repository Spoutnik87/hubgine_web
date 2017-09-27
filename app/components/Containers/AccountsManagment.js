import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { fetchAccountList, addAccount, updateAccount, removeAccount } from "../../actions/accounts";
import TwitterAccountForm from "../Forms/TwitterAccountForm";
import AccountItem from "../AccountItem";
import LoadingCog from "../LoadingCog";

class AccountsManagment extends Component {
    static propTypes = {
        accounts: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.shape({
                uid: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                consumerKey: PropTypes.string.isRequired,
                consumerSecret: PropTypes.string.isRequired,
                accessTokenKey: PropTypes.string.isRequired,
                accessTokenSecret: PropTypes.string.isRequired
            }))
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            creationFormDisplayed: false,
            loadingAccountForm: false,
            loading: false,
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
            accessTokenSecret
        } = event.result;
        this.setState({
            loadingAccountForm: true
        });
        this.props.actions.addAccount(name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret).then(() => {
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
            accessTokenSecret
        } = event.result;
        this.setState({
            loadingAccountForm: true
        });
        this.props.actions.updateAccount(event.default.name, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret).then(() => {
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

    componentDidMount()
    {
        this.setState({
            loading: true
        });
        this.props.actions.fetchAccountList().then(() => {
            this.setState({
                loading: false
            });
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
            PROFILE_ACCOUNT_LIST
        } = this.props.lang;
        return this.state.loading ? (
            <LoadingCog />
        ) : (
            this.state.creationFormDisplayed ? (
                <TwitterAccountForm onSubmit={this.handleAccountCreationSubmit} cancel onCancel={this.handleAccountCreationCancel} loading={this.state.loadingAccountForm}/>
            ) : (
                <div>
                    <ul className="list-group">
                        {
                            this.props.accounts.data.map(account => (
                                <li key={account.uid} className="list-group-item">
                                    {
                                        this.state.selectedAccount === account.name ? (
                                            <TwitterAccountForm onSubmit={this.handleAccountEditionSubmit} cancel onCancel={this.handleAccountEditionCancel} edit delete onDelete={this.handleAccountEditionDelete} account={account} loading={this.state.loadingAccountForm} />
                                        ) : (
                                            <AccountItem account={account} onClick={this.handleAccountChange} />
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                    <button id="buttonSubmit" className="btn btn-success" onClick={this.handleClick}>Add account</button>
                </div>
            ));
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        accounts: state.accounts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchAccountList, addAccount, updateAccount, removeAccount
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsManagment);