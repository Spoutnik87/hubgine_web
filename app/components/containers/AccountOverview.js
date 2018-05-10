import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { findIndex, isEqual } from "lodash";
import { fetchAccountList, updateAccount, removeAccount, addCampaign } from "../../actions/accounts";
import { withLanguage } from "../withLanguage";
import { withMessages } from "../withMessages";
import TwitterAccountForm from "../forms/TwitterAccountForm";
import CampaignList from "../CampaignList";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Container from "../Container";
import Card from "../Card";
import PrimaryButton from "../buttons/PrimaryButton";
import SuccessButton from "../buttons/SuccessButton";
import CampaignForm from "../forms/CampaignForm";
import WordList from "../WordList";
import Input from "../inputs/Input"
import Text from "../Text";
import TwitterAccountStats from "../stats/TwitterAccountStats";

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
            ACCOUNTOVERVIEW_ADD_CAMPAIGN_BUTTON: PropTypes.string.isRequired,
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
            displayCampaignCreationForm: false,
            loadingCampaignForm: false
        };
        this.handleAccountEditionSubmit = this.handleAccountEditionSubmit.bind(this);
        this.handleAccountEditionDelete = this.handleAccountEditionDelete.bind(this);
        this.handleAccountEditionCancel = this.handleAccountEditionCancel.bind(this);
        this.handleCampaignSelection = this.handleCampaignSelection.bind(this);
        this.handleCampaignCreationSubmit = this.handleCampaignCreationSubmit.bind(this);
        this.handleCampaignCreationCancel = this.handleCampaignCreationCancel.bind(this);
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
        let state = {
            loadingAccountForm: false
        };
        this.props.actions.updateAccount(event.default.name, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, blacklist).then(() => {
            state = {
                ...state,
                editAccount: false,
                accountId: name,
                account: this.props.accounts[findIndex(this.props.accounts, { name: name })]
            }
        }).catch(() => {}).finally(() => {
            this.setState(state);
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

    handleCampaignCreationSubmit(event)
    {
        const {
            accountId,
            name,
            dateBegin,
            dateEnd
        } = event.result;
        this.setState({
            loadingCampaignForm: true
        });
        let state = {
            loadingCampaignForm: false
        };
        this.props.actions.addCampaign(accountId, name, dateBegin, dateEnd).then(() => {
            state = {
                ...state,
                displayCampaignCreationForm: false
            };
        }).catch(error => {}).finally(() => {
            this.setState(state);
        });
    }

    handleCampaignCreationCancel(event)
    {
        this.setState({
            displayCampaignCreationForm: false
        });
    }

    handleClick(event)
    {
        if (event.target.id === "editAccount")
        {
            this.setState({
                editAccount: true
            });
        }
        else if (event.target.id === "addCampaign")
        {
            this.setState({
                displayCampaignCreationForm: true
            });
        }
    }

    render()
    {
        const {
            ACCOUNTOVERVIEW_NO_ACCOUNT,
            ACCOUNTOVERVIEW_EDIT_BUTTON,
            ACCOUNTOVERVIEW_ADD_CAMPAIGN_BUTTON,
            ACCOUNTOVERVIEW_CAMPAIGNS_TITLE
        } = this.props.lang;
        const {
            accounts,
            messages
        } = this.props;
        const {
            editAccount,
            loadingAccountList,
            accountId,
            account,
            loadingAccountForm,
            displayCampaignCreationForm,
            loadingCampaignForm
        } = this.state;
        return (
            <Container>
                {
                    loadingAccountList ? (
                        <Card title={accountId}>
                            <LoadingCog center/>
                        </Card>
                    ) : (
                        account ? (
                            <Card title={accountId} rightTitle={!editAccount && <PrimaryButton id="editAccount" onClick={this.handleClick}>{ACCOUNTOVERVIEW_EDIT_BUTTON}</PrimaryButton>}>
                            {
                                editAccount ? (
                                    <TwitterAccountForm account={account} loading={loadingAccountForm} cancel edit delete onCancel={this.handleAccountEditionCancel} onDelete={this.handleAccountEditionDelete} onSubmit={this.handleAccountEditionSubmit}/>
                                ) : (
                                    <Fragment>
                                        <TwitterAccountStats account={account}/>
                                        <br/>
                                        <Card title={ACCOUNTOVERVIEW_CAMPAIGNS_TITLE} rightTitle={!displayCampaignCreationForm && <PrimaryButton id="addCampaign" onClick={this.handleClick}>{ACCOUNTOVERVIEW_ADD_CAMPAIGN_BUTTON}</PrimaryButton>}>
                                        {
                                            displayCampaignCreationForm ? (
                                                <CampaignForm accounts={accounts.map(account => account.name)} loading={loadingCampaignForm} onSubmit={this.handleCampaignCreationSubmit} cancel onCancel={this.handleCampaignCreationCancel}/>
                                            ) : (
                                                <CampaignList account={account} campaigns={account.campaigns} onClick={this.handleCampaignSelection}/>
                                            )
                                        }
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
            removeAccount,
            addCampaign
        }, dispatch)
    };
};

export default withRouter(withMessages(withLanguage(connect(mapStateToProps, mapDispatchToProps)(AccountOverview))));