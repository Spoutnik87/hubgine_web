import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isValidCampaignName, isUniqueCampaignName, isValidCampaignDateBegin, isValidCampaignDateEnd } from "validator";
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
        const { CAMPAIGNFORM_NAME_INCORRECT,
            CAMPAIGNFORM_NAME_NOT_UNIQUE,
            CAMPAIGNFORM_ACCOUNT_INCORRECT,
            CAMPAIGNFORM_DATEBEGIN_INCORRECT,
            CAMPAIGNFORM_DATEEND_INCORRECT,
            CAMPAIGNFORM_DATES_INCORRECT,
            CAMPAIGNFORM_CREATE_SUCCESS, 
            CAMPAIGNFORM_GENERIC_ERROR
        } = this.props.lang;
        const { name, accountId, dateBegin, dateEnd } = event.result;
        const messages = [];
        if (!isValidCampaignName(name))
        {
            messages.push(CAMPAIGNFORM_NAME_INCORRECT);
        }
        if (!isUniqueCampaignName(name, this.props.campaigns.map(campaign => campaign.name)))
        {
            messages.push(CAMPAIGNFORM_NAME_NOT_UNIQUE);
        }
        if (!isValidCampaignAccount(accountId, this.props.accounts.data.map(account => account.name)))
        {
            messages.push(CAMPAIGNFORM_ACCOUNT_INCORRECT);
        }
        if (!isValidCampaignDateBegin(dateBegin))
        {
            messages.push(CAMPAIGNFORM_DATEBEGIN_INCORRECT);
        }
        if (!isValidCampaignDateEnd(dateEnd))
        {
            messages.push(CAMPAIGNFORM_DATEEND_INCORRECT);
        }
        if (dateBegin >= dateEnd)
        {
            messages.push(CAMPAIGNFORM_DATES_INCORRECT);
        }
        if (messages.length === 0)
        {
            this.setState({
                loadingCampaignForm: true
            });
            /*addCampaign(name, accountId, dateBegin, dateEnd, (error, result) =>
            {
                if (!error)
                {
                    this.props.dispatch(addCampaignToProps({
                        name,
                        accountId,
                        dateBegin,
                        dateEnd
                    }));
                    this.props.dispatch(sendSuccessMessage(CAMPAIGNFORM_CREATE_SUCCESS));
                }
                else
                {
                    this.props.dispatch(sendFailureMessage(CAMPAIGNFORM_GENERIC_ERROR));
                }
                this.setState({
                    loadingCampaignForm: false
                });
            });*/
        }
        else
        {
            this.props.dispatch(sendFailureMessages(messages));
        }
    }

    render()
    {
        const campaignForm = this.state.campaignForm ? <CampaignForm name="campaignform" onSubmit={this.handleCampaignFormSubmit} cancel onCancel={this.handleCampaignFormCancel} loading={this.state.loadingCampaignForm} messages={this.props.messages}/>
            : <button id="createcampaign" type="submit" className="btn btn-success" onClick={this.handleClick}>Create a campaign</button>;

        const campaignList = this.props.campaigns.map(campaign => (
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
        accounts: state.accounts,
        messages: state.messages,
        campaigns: state.campaigns,
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountSettings);