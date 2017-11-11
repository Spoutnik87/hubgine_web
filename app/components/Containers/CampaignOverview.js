import React, { Component } from "react";
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
import Panel from "../Panel";
import PrimaryButton from "../buttons/PrimaryButton";
import SuccessButton from "../buttons/SuccessButton";
import TwitterRuleForm from "../Forms/TwitterRuleForm";

class CampaignOverview extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                accountId: PropTypes.string.isRequired,
                campaignId: PropTypes.string.isRequired
            }).isRequired
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
            campaign: undefined,
            selectedRule: "",
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
            accountId,
            campaignId
        } = this.state;
        this.props.actions.fetchAccountList().then(() => {
            const accountIndex = findIndex(this.props.accounts, { name: this.state.accountId });
            this.setState({
                loadingAccountList: false,
                campaign: this.props.accounts[accountIndex].campaigns[findIndex(this.props.accounts[accountIndex].campaigns, { name: this.state.campaignId })]
            });
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
            track,
            condition,
            delay,
            lang
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.addTwitterRule(this.state.accountId, this.state.campaignId, name, type, track, condition, delay, 3, lang).then(() => {
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
            track,
            condition,
            delay,
            lang
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.updateTwitterRule(accountId, campaignId, ruleId, name, type, track, condition, delay, null, lang).then(() => {
            this.setState({
                loading: false,
                selectedRule: ""
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
                selectedRule: ""
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
            selectedRule: ""
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
        return (
            <Container>
                {
                    this.state.loadingAccountList ? (
                        <Panel title={this.state.accountId + " : " + this.state.campaignId}>
                            <LoadingCog center />
                        </Panel>
                    ) : (
                        this.state.campaign ? (
                            <Panel title={<span>{this.state.accountId + " : " + this.state.campaignId}{!this.state.editCampaign && <PrimaryButton id="editCampaign" style={{ float: "right" }} onClick={this.handleClick}>Edit</PrimaryButton>}</span>}>
                            {
                                this.state.editCampaign ? (
                                    <CampaignForm onSubmit={this.handleCampaignEditionSubmit} onDelete={this.handleCampaignEditionDelete} onCancel={this.handleCampaignEditionCancel} accounts={this.props.accounts.map(account => account.name)} accountId={this.state.accountId} campaign={this.state.campaign} messages={this.props.messages} edit cancel delete />
                                ) : (
                                    <div>
                                        <Messages messages={this.props.messages} />
                                        <Panel title="Rules">
                                        {
                                            this.state.creationRuleFormDisplayed ? (
                                               <TwitterRuleForm onSubmit={this.handleRuleCreationSubmit} cancel onCancel={this.handleRuleCreationCancel} loading={this.state.loading} />
                                            ) : (
                                               <RuleList accountId={this.state.accountId} campaignId={this.state.campaignId} rules={this.state.campaign.config.rules} onRuleEditMode={this.handleRuleEditMode} selectedRule={this.state.selectedRule} loading={this.state.loading} onRuleEditionSubmit={this.handleRuleEditionSubmit} onRuleEditionDelete={this.handleRuleEditionDelete} onRuleEditionCancel={this.handleRuleEditionCancel}/>
                                            )
                                        }
                                        </Panel>
                                        {
                                            !this.state.creationRuleFormDisplayed && (
                                                <SuccessButton id="createRule" onClick={this.handleClick}>Add rule</SuccessButton>
                                            )
                                        }
                                    </div>
                                )
                            }
                            </Panel>
                        ) : (
                            <Panel title={this.state.accountId + " : " + this.state.campaignId}>
                                <Messages messages={this.props.messages} />
                                This campaign doesn't exist.
                            </Panel>
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
            removeCampaign, updateCampaign,
            addTwitterRule, updateTwitterRule, removeTwitterRule
        }, dispatch)
    };
};

export default withRouter(withMessages(withLanguage(connect(mapStateToProps, mapDispatchToProps)(CampaignOverview))));