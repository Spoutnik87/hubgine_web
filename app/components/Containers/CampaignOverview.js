import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { findIndex } from "lodash";
import { fetchAccountList } from "../../actions/accounts";
import { fetchCampaign, removeCampaign, updateCampaign } from "../../actions/campaigns";
import { withLanguage } from "../withLanguage";
import { withMessages } from "../withMessages";
import CampaignForm from "../Forms/CampaignForm";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Container from "../Container";
import Panel from "../Panel";
import PrimaryButton from "../buttons/PrimaryButton";

class CampaignOverview extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                accountId: PropTypes.string.isRequired,
                campaignId: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        campaigns: PropTypes.array.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loadingAccountList: true,
            loadingCampaign: true,
            editCampaign: false,
            accountId: decodeURI(this.props.match.params.accountId),
            campaignId: decodeURI(this.props.match.params.campaignId),
            campaign: undefined
        };
        this.handleClick = this.handleClick.bind(this);
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
            this.setState({
                loadingAccountList: false
            });
        }).catch(error => {
            this.setState({
                loadingAccountList: false
            });
        });
        this.props.actions.fetchCampaign(accountId, campaignId).then(() => {
            this.setState({
                loadingCampaign: false,
                campaign: this.props.campaigns[findIndex(this.props.campaigns, { accountId: this.state.accountId, name: this.state.campaignId })]
            });
        }).catch(error => {
            this.setState({
                loadingCampaign: false
            });
        });
    }

    handleClick(event)
    {
        if (event.target.id === "editCampaign")
        {
            this.setState({
                editCampaign: true
            });
        }
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
            this.setState({
                editCampaign: false,
                accountId: accountId,
                campaignId: name,
                campaign: this.props.campaigns[findIndex(this.props.campaigns, { accountId: accountId, name: name })]
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
            this.setState({
                editCampaign: false,
                campaign: null
            });
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
                    this.state.loadingAccountList || this.state.loadingCampaign ? (
                        <Panel title={this.state.accountId + " : " + this.state.campaignId}>
                            <LoadingCog center />
                        </Panel>
                    ) : (
                        this.state.campaign ? (
                            <Panel title={<span>{this.state.accountId + " : " + this.state.campaignId}{!this.state.editCampaign && <PrimaryButton id="editCampaign" style={{ float: "right" }} onClick={this.handleClick}>Edit</PrimaryButton>}</span>}>
                            {
                                this.state.editCampaign ? (
                                    <CampaignForm onSubmit={this.handleCampaignEditionSubmit} onDelete={this.handleCampaignEditionDelete} onCancel={this.handleCampaignEditionCancel} accounts={this.props.accounts} campaign={this.state.campaign} messages={this.props.messages} edit cancel delete />
                                ) : (
                                    <div>
                                        <Messages messages={this.props.messages} />
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
        accounts: state.accounts.data,
        campaigns: state.campaigns.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchAccountList,
            fetchCampaign, removeCampaign, updateCampaign
        }, dispatch)
    };
};

export default withRouter(withMessages(withLanguage(connect(mapStateToProps, mapDispatchToProps)(CampaignOverview))));