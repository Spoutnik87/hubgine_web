import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { findIndex, filter } from "lodash";
import { addCampaign } from "../../actions/accounts";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import CampaignOverview from "./CampaignOverview";
import CampaignList from "../CampaignList";
import CampaignForm from "../forms/CampaignForm";
import Container from "../Container";
import Card from "../Card";
import SuccessButton from "../buttons/SuccessButton";
import InfoButton from "../buttons/InfoButton";

class UserDashboard extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            USERDASHBOARD_TITLE: PropTypes.string.isRequired,
            USERDASHBOARD_ADD_CAMPAIGN: PropTypes.string.isRequired,
            USERDASHBOARD_NO_ACCOUNTS: PropTypes.string.isRequired,
            USERDASHBOARD_DISPLAY_ACCOUNT_BUTTON: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loadingCampaignForm: false,
            displayCampaignForm: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCampaignCreationSubmit = this.handleCampaignCreationSubmit.bind(this);
        this.handleCampaignCreationCancel = this.handleCampaignCreationCancel.bind(this);
        this.handleCampaignSelection = this.handleCampaignSelection.bind(this);
    }

    handleClick(event)
    {
        if (event.target.id === "displayCampaignForm")
        {
            this.setState({
                displayCampaignForm: true
            });
        }
        else if (event.target.id === "displayAccount")
        {
            this.props.history.push(encodeURI("/account/" + event.target.getAttribute("data-element")));
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
        this.props.history.push(encodeURI("/campaign/" + account + "/" + campaign));
    }

    render()
    {
        const {
            USERDASHBOARD_TITLE,
            USERDASHBOARD_ADD_CAMPAIGN,
            USERDASHBOARD_NO_ACCOUNTS,
            USERDASHBOARD_DISPLAY_ACCOUNT_BUTTON
        } = this.props.lang;
        const {
            messages,
            accounts
        } = this.props;
        const {
            loadingCampaignForm,
            displayCampaignForm
        } = this.state;
        return (
            <Container>
                <Card title={USERDASHBOARD_TITLE}>
                {
                    accounts.length === 0 ? (
                        <div>{USERDASHBOARD_NO_ACCOUNTS}</div>
                    ) : displayCampaignForm ? (
                        <CampaignForm name="campaignForm" accounts={accounts.filter(account => {
                            const campaignNumber = accounts[findIndex(accounts, { name: account.name })].campaigns.length;
                            return campaignNumber < account.maxCampaigns;
                        }).map(account => account.name)} loading={loadingCampaignForm} cancel messages={messages} onCancel={this.handleCampaignCreationCancel} onSubmit={this.handleCampaignCreationSubmit}/>
                    ) : (
                        accounts.map(account => (
                            <Card key={account.uid} title={account.name} rightTitle={<InfoButton id="displayAccount" data-element={account.name} onClick={this.handleClick}>{USERDASHBOARD_DISPLAY_ACCOUNT_BUTTON}</InfoButton>}>
                                <CampaignList account={account} campaigns={accounts[findIndex(accounts, { name: account.name })].campaigns} onClick={this.handleCampaignSelection}/>
                            </Card>
                        ))
                    )
                }
                {
                    !displayCampaignForm && accounts.length > 0 && (
                        <SuccessButton id="displayCampaignForm" onClick={this.handleClick}>{USERDASHBOARD_ADD_CAMPAIGN}</SuccessButton>
                    )
                }
                </Card>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            addCampaign
        }, dispatch)
    };
};

export default withRouter(withProps(connect(undefined, mapDispatchToProps)(UserDashboard), [ Props.LANG, Props.MESSAGES, Props.ACCOUNTS ]));