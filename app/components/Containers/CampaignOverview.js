import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { findIndex } from "lodash";
import { fetchAccountList, removeCampaign, updateCampaign, addTwitterRule, updateTwitterRule, removeTwitterRule } from "../../actions/accounts";
import { withLanguage } from "../withLanguage";
import { withMessages } from "../withMessages";
import CampaignForm from "../Forms/CampaignForm";
import RuleList from "../RuleList";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Container from "../Container";
import Card from "../Card";
import PrimaryButton from "../buttons/PrimaryButton";
import SuccessButton from "../buttons/SuccessButton";
import TwitterRuleForm from "../Forms/TwitterRuleForm";
import Input from "../Inputs/Input";
import DateInput from "../Inputs/DateInput";

class CampaignOverview extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                accountId: PropTypes.string.isRequired,
                campaignId: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        lang: PropTypes.shape({
            CAMPAIGNOVERVIEW_NO_CAMPAIGN: PropTypes.string.isRequired,
            CAMPAIGNOVERVIEW_EDIT_BUTTON: PropTypes.string.isRequired,
            CAMPAIGNOVERVIEW_RULES_TITLE: PropTypes.string.isRequired,
            CAMPAIGNOVERVIEW_ADD_RULE_BUTTON: PropTypes.string.isRequired,
            CAMPAIGNOVERVIEW_TITLE_ACCOUNT: PropTypes.string.isRequired,
            CAMPAIGNOVERVIEW_TITLE_CAMPAIGN: PropTypes.string.isRequired,
            CAMPAIGNOVERVIEW_NAME: PropTypes.string.isRequired,
            CAMPAIGNOVERVIEW_DATEBEGIN: PropTypes.string.isRequired,
            CAMPAIGNOVERVIEW_DATEEND: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            creationRuleFormDisplayed: false,
            loadingAccountList: true,
            editCampaign: false,
            accountId: decodeURI(this.props.match.params.accountId),
            campaignId: decodeURI(this.props.match.params.campaignId),
            campaign: null,
            selectedRule: null,
            loading: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleRuleCreationSubmit = this.handleRuleCreationSubmit.bind(this);
        this.handleRuleCreationCancel = this.handleRuleCreationCancel.bind(this);
        this.handleRuleEditMode = this.handleRuleEditMode.bind(this);
        this.handleRuleEditionSubmit = this.handleRuleEditionSubmit.bind(this);
        this.handleRuleEditionDelete = this.handleRuleEditionDelete.bind(this);
        this.handleRuleEditionCancel = this.handleRuleEditionCancel.bind(this);
        this.handleCampaignEditionSubmit = this.handleCampaignEditionSubmit.bind(this);
        this.handleCampaignEditionDelete = this.handleCampaignEditionDelete.bind(this);
        this.handleCampaignEditionCancel = this.handleCampaignEditionCancel.bind(this);
    }

    componentDidMount()
    {
        const {
            accounts
        } = this.props;
        const {
            accountId,
            campaignId
        } = this.state;
        this.props.actions.fetchAccountList().then(() => {
            const accountIndex = findIndex(accounts, { name: accountId });
            const state = {
                loadingAccountList: false
            };
            if (accountIndex !== -1)
            {
                state.campaign = accounts[accountIndex].campaigns[findIndex(accounts[accountIndex].campaigns, { name: campaignId })];
            }
            this.setState(state);
        }).catch(error => {});
    }

    handleClick(event)
    {
        if (event.target.id === "editCampaign")
        {
            this.setState({
                editCampaign: true
            });
        }
        else if (event.target.id === "createRule")
        {
            this.setState({
                creationRuleFormDisplayed: true
            });
        }
    }

    handleRuleCreationSubmit(event)
    {
        const {
            name,
            type,
            messages,
            track,
            condition,
            delay,
            lang
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.addTwitterRule(this.state.accountId, this.state.campaignId, name, type, messages, track, condition, delay, 3, lang).then(() => {
            this.setState({
                loading: false,
                creationRuleFormDisplayed: false
            });
        }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleRuleCreationCancel()
    {
        this.setState({
            creationRuleFormDisplayed: false
        });
    }

    handleRuleEditMode(event)
    {
        this.setState({
            selectedRule: event.name
        });
    }

    handleRuleEditionSubmit(event)
    {
        const {
            accountId,
            campaignId
        } = this.state;
        const {
            ruleId
        } = event;
        const {
            name,
            type,
            messages,
            track,
            condition,
            delay,
            lang
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.updateTwitterRule(accountId, campaignId, ruleId, name, type, messages, track, condition, delay, null, lang).then(() => {
            this.setState({
                loading: false,
                selectedRule: null
            });
        }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleRuleEditionDelete(event)
    {
        const {
            accountId,
            campaignId
        } = this.state;
        const {
            name
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.removeTwitterRule(accountId, campaignId, name).then(() => {
            this.setState({
                loading: false,
                selectedRule: undefined
            });
        }).catch(() => {
            this.setState({
                loading: false
            });
        });
    }

    handleRuleEditionCancel()
    {
        this.setState({
            selectedRule: undefined
        });
    }

    handleCampaignEditionSubmit(event)
    {
        const {
            accountId,
            name,
            dateBegin,
            dateEnd
        } = event.result;
        const {
            accountId: initialAccountId,
            name: initialName
        } = event.default;
        this.props.actions.updateCampaign(initialAccountId, initialName, name, dateBegin, dateEnd).then(() => {
            const accountIndex = findIndex(this.props.accounts, { name: accountId });
            this.setState({
                editCampaign: false,
                accountId: accountId,
                campaignId: name,
                campaign: this.props.accounts[accountIndex].campaigns[findIndex(this.props.accounts[accountIndex].campaigns, { name: name })]
            });
            this.props.history.push(encodeURI("/campaign/" + accountId + "/" + name));
        }).catch(error => {});
    }

    handleCampaignEditionDelete(event)
    {
        const {
            accountId,
            name
        } = event.result;
        this.props.actions.removeCampaign(accountId, name).then(() => {
            this.props.history.push("/user-dashboard/");
        });
    }

    handleCampaignEditionCancel(event)
    {
        this.setState({
            editCampaign: false
        });
    }

    render()
    {
        const {
            CAMPAIGNOVERVIEW_NO_CAMPAIGN,
            CAMPAIGNOVERVIEW_EDIT_BUTTON,
            CAMPAIGNOVERVIEW_RULES_TITLE,
            CAMPAIGNOVERVIEW_ADD_RULE_BUTTON,
            CAMPAIGNOVERVIEW_TITLE_ACCOUNT,
            CAMPAIGNOVERVIEW_TITLE_CAMPAIGN,
            CAMPAIGNOVERVIEW_NAME,
            CAMPAIGNOVERVIEW_DATEBEGIN,
            CAMPAIGNOVERVIEW_DATEEND
        } = this.props.lang;
        const {
            messages,
            accounts
        } = this.props;
        const {
            loadingAccountList,
            accountId,
            campaignId,
            editCampaign,
            loading,
            campaign,
            creationRuleFormDisplayed,
            selectedRule
        } = this.state;
        return (
            <Container>
                <Card title={CAMPAIGNOVERVIEW_TITLE_ACCOUNT + accountId + " - " + CAMPAIGNOVERVIEW_TITLE_CAMPAIGN + campaignId} rightTitle={!editCampaign && <PrimaryButton id="editCampaign" onClick={this.handleClick}>{CAMPAIGNOVERVIEW_EDIT_BUTTON}</PrimaryButton>}>
                {
                    loadingAccountList ? (
                        <LoadingCog center/>
                    ) : (
                        campaign ? (
                            editCampaign ? (
                                <CampaignForm accounts={accounts.map(account => account.name)} accountId={accountId} campaign={campaign} messages={messages} edit cancel delete onCancel={this.handleCampaignEditionCancel} onDelete={this.handleCampaignEditionDelete} onSubmit={this.handleCampaignEditionSubmit}/>
                            ) : (
                                <Fragment>
                                    <Messages messages={messages}/>
                                    <Input name="name" value={campaign.name} label={CAMPAIGNOVERVIEW_NAME} disabled/>
                                    <DateInput name="dateBegin" value={campaign.dateBegin} label={CAMPAIGNOVERVIEW_DATEBEGIN} disabled/>
                                    <DateInput name="dateEnd" value={campaign.dateEnd} label={CAMPAIGNOVERVIEW_DATEEND} disabled/>
                                    <Card title={CAMPAIGNOVERVIEW_RULES_TITLE} rightTitle={!creationRuleFormDisplayed && <SuccessButton id="createRule" onClick={this.handleClick}>{CAMPAIGNOVERVIEW_ADD_RULE_BUTTON}</SuccessButton>}>
                                    {
                                        creationRuleFormDisplayed ? (
                                            <TwitterRuleForm cancel loading={loading} onCancel={this.handleRuleCreationCancel} onSubmit={this.handleRuleCreationSubmit}/>
                                        ) : (
                                            <RuleList accountId={accountId} campaignId={campaignId} rules={campaign.config.rules} onRuleEditMode={this.handleRuleEditMode} selectedRule={selectedRule} loading={loading} onRuleEditionSubmit={this.handleRuleEditionSubmit} onRuleEditionDelete={this.handleRuleEditionDelete} onRuleEditionCancel={this.handleRuleEditionCancel}/>
                                        )
                                    }
                                    </Card>
                                </Fragment>
                            )
                        ) : (
                            <Fragment>
                                <Messages messages={messages}/>
                                {CAMPAIGNOVERVIEW_NO_CAMPAIGN}
                            </Fragment>
                        )
                    )
                }
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            fetchAccountList,
            removeCampaign, updateCampaign,
            addTwitterRule, updateTwitterRule, removeTwitterRule
        }, dispatch)
    };
};

export default withRouter(withMessages(withLanguage(connect(mapStateToProps, mapDispatchToProps)(CampaignOverview))));