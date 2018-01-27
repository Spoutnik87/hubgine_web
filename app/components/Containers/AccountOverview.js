import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { findIndex, isEqual } from "lodash";
import { fetchAccountList, updateAccount, removeAccount } from "../../actions/accounts";
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
            account: undefined,
            loadingAccountForm: false,
            editAccount: false
        };
        this.handleAccountEditionSubmit = this.handleAccountEditionSubmit.bind(this);
        this.handleAccountEditionDelete = this.handleAccountEditionDelete.bind(this);
        this.handleAccountEditionCancel = this.handleAccountEditionCancel.bind(this);
        this.handleCampaignSelection = this.handleCampaignSelection.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        this.props.actions.updateAccount(event.default.name, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, blacklist).then(() => {}).catch(() => {}).finally(() => {
            this.setState({
                loadingAccountForm: false,
                editAccount: false,
                accountId: name,
                account: this.props.accounts[findIndex(this.props.accounts, { name: name })]
            });
            this.props.history.push(encodeURI("/account/" + name));
        });
    }

    handleAccountEditionDelete(event)
    {
        this.setState({
            loadingAccountForm: true
        });
        this.props.actions.removeAccount(event.default.name).then(() => {
            this.setState({
                loadingAccountForm: false,
                account: undefined
            });
            this.props.history.push("/user-dashboard/");
        });
    }

    handleAccountEditionCancel()
    {
        this.setState({
            editAccount: false
        });
    }

    handleCampaignSelection({ account, campaign })
    {
        this.props.history.push(encodeURI("/campaign/" + account + "/" + campaign));
    }

    handleClick(event)
    {
        if (event.target.id === "editAccount")
        {
            this.setState({
                editAccount: true
            });
        }
    }

    render()
    {
        const {
            ACCOUNTOVERVIEW_NO_ACCOUNT,
            ACCOUNTOVERVIEW_EDIT_BUTTON,
            ACCOUNTOVERVIEW_CAMPAIGNS_TITLE,
            ACCOUNTOVERVIEW_BLACKLIST_TITLE
        } = this.props.lang;
        const { messages } = this.props;
        const {
            editAccount,
            loadingAccountList,
            accountId,
            account,
            loadingAccountForm
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
                            <Card title={<span>{accountId}{!editAccount && <PrimaryButton id="editAccount" style={{ float: "right" }} onClick={this.handleClick}>{ACCOUNTOVERVIEW_EDIT_BUTTON}</PrimaryButton>}</span>}>
                                {
                                    editAccount ? (
                                        <TwitterAccountForm account={account} loading={loadingAccountForm} cancel edit delete onCancel={this.handleAccountEditionCancel} onDelete={this.handleAccountEditionDelete} onSubmit={this.handleAccountEditionSubmit}/>
                                    ) : (
                                        <Fragment>
                                            <Card title={ACCOUNTOVERVIEW_CAMPAIGNS_TITLE}>
                                                <CampaignList account={account} campaigns={account.campaigns} onClick={this.handleCampaignSelection}/>
                                            </Card>
                                            <Card title={ACCOUNTOVERVIEW_BLACKLIST_TITLE}>
                                                <WordList words={account.blacklist}/>
                                            </Card>
                                        </Fragment>
                                    )
                                }
                            </Card>
                        ) : (
                            <Card title={accountId}>
                                <Messages messages={messages}/>
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
            fetchAccountList,
            updateAccount,
            removeAccount
        }, dispatch)
    };
};

export default withRouter(withMessages(withLanguage(connect(mapStateToProps, mapDispatchToProps)(AccountOverview))));