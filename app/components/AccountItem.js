import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AccountItem extends Component {
    static propTypes = {
        name: PropTypes.string,
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        onClick: PropTypes.func
    };

    static defaultProps = {
        name: "AccountItem",
        onClick: () => {}
    };

    render()
    {
        return (
            <div id={this.props.account.name} className="form-control" onClick={this.props.onClick}>{this.props.account.name}</div>
        );
    }
}

export default AccountItem;