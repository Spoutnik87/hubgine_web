import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { isValidCampaignName, isUniqueCampaignName, isValidCampaignAccount, isValidCampaignDateBegin, isValidCampaignDateEnd } from "validator";
import { sendSuccessMessage, sendFailureMessage, sendFailureMessages } from "../actions/messages";
import { addCampaign as addCampaignToProps } from "../actions/campaigns";
import { addCampaign } from "../net/Requests";
import CampaignForm from "./Forms/CampaignForm";
import TwitterRuleForm from "./Forms/TwitterRuleForm";

class AccountSettings extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        lang: PropTypes.shape({
            CAMPAIGNFORM_NAME_INCORRECT: PropTypes.string.isRequired,
            CAMPAIGNFORM_NAME_NOT_UNIQUE: PropTypes.string.isRequired,
            CAMPAIGNFORM_ACCOUNT_INCORRECT: PropTypes.string.isRequired,
            CAMPAIGNFORM_DATEBEGIN_INCORRECT: PropTypes.string.isRequired,
            CAMPAIGNFORM_DATEEND_INCORRECT: PropTypes.string.isRequired,
            CAMPAIGNFORM_DATES_INCORRECT: PropTypes.string.isRequired,
            CAMPAIGNFORM_CREATE_SUCCESS: PropTypes.string.isRequired,
            CAMPAIGNFORM_GENERIC_ERROR: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loadingCampaignForm: false,
            campaignForm: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCampaignFormCancel = this.handleCampaignFormCancel.bind(this);
        this.handleCampaignFormSubmit = this.handleCampaignFormSubmit.bind(this);
    }

    handleClick(event)
    {
        if (event.target.id === "createcampaign")
        {
            this.setState({
                campaignForm: true
            });
        }
    }

    handleChange(event)
    {

    }

    handleCampaignFormCancel(event)
    {
        this.setState({
            campaignForm: false
        });
    }

    handleCampaignFormSubmit(event)
    {
        const { accountId, name, dateBegin, dateEnd } = event.result;
        this.setState({
            loadingCampaignForm: true 
        });
        this.props.actions.addCampaign(accountId, name, dateBegin, dateEnd).then(result => {
            this.setState({
                loadingCampaignForm: false
            });
        }).catch(error => {
            this.setState({
                loadingCampaignForm: false
            });
        });
    }

    render()
    {
        const campaignForm = this.state.campaignForm ? <CampaignForm name="campaignform" onSubmit={this.handleCampaignFormSubmit} cancel onCancel={this.handleCampaignFormCancel} loading={this.state.loadingCampaignForm} messages={this.props.messages}/>
            : <button id="createcampaign" type="submit" className="btn btn-success" onClick={this.handleClick}>Create a campaign</button>;

        const campaignList = this.props.campaigns.data.map(campaign => (
            <div key={campaign.uid}>{campaign.name}</div>
        ));
        return (
            <div>
                {campaignForm}
                {campaignList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        accounts: state.accounts,
        messages: state.messages,
        campaigns: state.campaigns,
        lang: state.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            addCampaign
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);