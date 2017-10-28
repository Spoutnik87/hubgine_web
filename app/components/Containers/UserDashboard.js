import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { findIndex, filter } from "lodash";
import { fetchAccountList } from "../../actions/accounts";
import { addCampaign } from "../../actions/accounts";
import { withMessages } from "../withMessages";
import CampaignOverview from "./CampaignOverview";
import CampaignList from "../CampaignList";
import CampaignForm from "../Forms/CampaignForm";
import Container from "../Container";
import Panel from "../Panel";
import LoadingCog from "../LoadingCog";
import SuccessButton from "../buttons/SuccessButton";

class UserDashboard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            loadingAccountList: true,
            loadingCampaignForm: false,
            displayCampaignForm: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCampaignCreationSubmit = this.handleCampaignCreationSubmit.bind(this);
        this.handleCampaignCreationCancel = this.handleCampaignCreationCancel.bind(this);
        this.handleCampaignSelection = this.handleCampaignSelection.bind(this);
    }

    componentDidMount()
    {
        this.props.actions.fetchAccountList().then(() => {
            this.setState({
                loadingAccountList: false
            });
        }).catch(error => {});
    }

    handleClick(event)
    {
        if (event.target.id === "displayCampaignForm")
        {
            this.setState({
                displayCampaignForm: true
            });
        }
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
        this.props.actions.addCampaign(accountId, name, dateBegin, dateEnd).then(() => {
            this.setState({
                loadingCampaignForm: false,
                displayCampaignForm: false
            });
        }).catch(error => {
            this.setState({
                loadingCampaignForm: false
            });
        });
    }

    handleCampaignCreationCancel(event)
    {
        this.setState({
            displayCampaignForm: false
        });
    }

    handleCampaignSelection({ account, campaign })
    {
        this.props.history.push("/campaign/" + account + "/" + campaign);
    }

    render()
    {
        return (
            <Container>
                <Panel title="User Dashboard">
                {
                    this.state.loadingAccountList ? (
                        <LoadingCog center />
                    ) : (
                        <div>
                            {
                                this.props.accounts.length === 0 ? (
                                    <div>You don't have accounts yet. Go to Profile page to create one.</div>
                                ) : this.state.displayCampaignForm ? (
                                    <CampaignForm name="campaignForm" accounts={this.props.accounts.filter(account => {
                                        const campaignNumber = this.props.accounts[findIndex(this.props.accounts, { name: account.name })].campaigns.length;
                                        return campaignNumber < account.maxCampaigns;
                                    }).map(account => account.name)} onSubmit={this.handleCampaignCreationSubmit} cancel onCancel={this.handleCampaignCreationCancel} messages={this.props.messages} />
                                ) : (
                                    this.props.accounts.map(account => (
                                        <Panel key={account.uid} title={account.name}>
                                            <CampaignList account={account} campaigns={this.props.accounts[findIndex(this.props.accounts, { name: account.name })].campaigns} onClick={this.handleCampaignSelection} />
                                        </Panel>
                                    ))
                                )
                            }
                            {
                                !this.state.displayCampaignForm && (
                                    <SuccessButton id="displayCampaignForm" onClick={this.handleClick}>Add campaign</SuccessButton>
                                )
                            }
                        </div>
                    )
                }
                </Panel>
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
            addCampaign
        }, dispatch)
    };
};

export default withRouter(withMessages(connect(mapStateToProps, mapDispatchToProps)(UserDashboard)));