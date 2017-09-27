import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { fetchAccountList } from "../actions/accounts";
import TwitterAccountForm from "./Forms/TwitterAccountForm";
import AccountItem from "./AccountItem";

class AccountEditList extends Component {
    static propTypes = {
        accounts: PropTypes.arrayOf(PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            consumerKey: PropTypes.string.isRequired,
            consumerSecret: PropTypes.string.isRequired,
            accessTokenKey: PropTypes.string.isRequired,
            accessTokenSecret: PropTypes.string.isRequired
        }).isRequired).isRequired,
        loading: PropTypes.bool,
        onAccountSubmit: PropTypes.func,
        onAccountCancel: PropTypes.func,
        onAccountDelete: PropTypes.func
    };

    static defaultProps = {
        loading: false,
        onAccountSubmit: () => {},
        onAccountCancel: () => {},
        onAccountDelete: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            selectedAccount: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleAccountCancel = this.handleAccountCancel.bind(this);
    }

    handleClick(event)
    {
        this.setState({
            selectedAccount: event.target.id
        });
    }

    handleAccountCancel(event)
    {
        this.setState({
            selectedAccount: ""
        });
    }

    render()
    {
        return (
            <ul>
                {
                    this.props.accounts.map(account => (
                        <li key={account.uid}>
                            {
                                this.state.selectedAccount === account.name ? (
                                    <TwitterAccountForm onSubmit={this.props.onAccountSubmit} cancel onCancel={this.props.onAccountCancel} edit delete onDelete={this.props.onAccountDelete} account={account} loading={this.props.loading} />
                                ) : (
                                    <AccountItem account={account} onClick={this.handleClick} />
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default AccountEditList;