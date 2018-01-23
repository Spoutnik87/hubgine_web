import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { findIndex } from "lodash";
import { fetchAccountList } from "../../actions/accounts";
import { withLanguage } from "../withLanguage";
import { withMessages } from "../withMessages";
import TwitterAccountForm from "../Forms/TwitterAccountForm";
import CampaignList from "../CampaignList";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Container from "../Container";
import Card from "../Card";
import PrimaryButton from "../buttons/PrimaryButton";
import SuccessButton from "../buttons/SuccessButton";
import TwitterRuleForm from "../Forms/TwitterRuleForm";
import WordList from "../WordList";

class AccountOverview extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                accountId: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        lang: PropTypes.shape({
            ACCOUNTOVERVIEW_NO_ACCOUNT: PropTypes.string.isRequired,
            ACCOUNTOVERVIEW_EDIT_BUTTON: PropTypes.string.isRequired,
            ACCOUNTOVERVIEW_CAMPAIGNS_TITLE: PropTypes.string.isRequired,
            ACCOUNTOVERVIEW_BLACKLIST_TITLE: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            editAccount: false,
            loadingAccountList: true,
            accountId: decodeURI(this.props.match.params.accountId),
            account: null
        };
    }

    componentDidMount()
    {
        const {
            accountId
        } = this.state;
        this.props.actions.fetchAccountList().then(() => {
            this.setState({
                loadingAccountList: false,
                account: this.props.accounts[findIndex(this.props.accounts, { name: this.state.accountId })]
            });
        }).catch(error => {});
    }

    render()
    {
        const {
            ACCOUNTOVERVIEW_NO_ACCOUNT,
            ACCOUNTOVERVIEW_EDIT_BUTTON,
            ACCOUNTOVERVIEW_CAMPAIGNS_TITLE,
            ACCOUNTOVERVIEW_BLACKLIST_TITLE
        } = this.props.lang;
        const {
            editAccount,
            loadingAccountList,
            accountId,
            account
        } = this.state;
        return (
            <Container>
                {
                    loadingAccountList ? (
                        <Card title={accountId}>
                            <LoadingCog center />
                        </Card>
                    ) : (
                        account ? (
                            <Card title={<span>{accountId}{!editAccount && <PrimaryButton id="editCampaign" style={{ float: "right" }} onClick={this.handleClick}>{ACCOUNTOVERVIEW_EDIT_BUTTON}</PrimaryButton>}</span>}>
                                <Card title={ACCOUNTOVERVIEW_CAMPAIGNS_TITLE}>
                                    <CampaignList account={account} campaigns={account.campaigns} onClick={this.handleCampaignSelection} />
                                </Card>
                                <Card title={ACCOUNTOVERVIEW_BLACKLIST_TITLE}>
                                    <WordList words={account.blacklist} />
                                </Card>
                            </Card>
                        ) : (
                            <Card title={accountId}>
                                <Messages messages={this.props.messages} />
                                {ACCOUNTOVERVIEW_NO_ACCOUNT}
                            </Card>
                        )
                    )
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchAccountList
        }, dispatch)
    };
};

export default withRouter(withMessages(withLanguage(connect(mapStateToProps, mapDispatchToProps)(AccountOverview))));