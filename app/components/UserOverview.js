import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AccountOverview from "./AccountOverview";
import CampaignList from "./CampaignList";
import LoadingCog from "./LoadingCog";

class UserOverview extends Component {
    static propTypes = {
        lang: PropTypes.shape({

        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {

        };
    }

    render()
    {
        const accountList = this.props.accounts.data.length > 0 ? this.props.accounts.data.map(account => (
            <AccountOverview key={account.uid} account={account} />
        )) : (
            <div>You don't have account yet. Go to Profile page to create one.</div>
        );

        return (
            <div>
                {accountList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        lang: state.lang,
        user: state.user,
        accounts: state.accounts
    };
};

export default connect(mapStateToProps)(UserOverview);