import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CampaignForm from "./Forms/CampaignForm";
import TwitterRuleForm from "./Forms/TwitterRuleForm";

class AccountOverview extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        lang: PropTypes.shape({
            
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false,
            isCampaignCreateFormDisplayed: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCampaignFormSubmit = this.handleCampaignFormSubmit.bind(this);
        this.handleCampaignFormCancel = this.handleCampaignFormCancel.bind(this);
    }

    handleClick(event)
    {
        if (event.target.id === "createcampaign")
        {
            this.setState({
                isCampaignCreateFormDisplayed: true
            });
        }
    }

    handleCampaignFormSubmit(event)
    {

    }

    handleCampaignFormCancel(event)
    {
        this.setState({
            isCampaignCreateFormDisplayed: false
        });
    }

    render()
    {
        const campaignList = this.state.isCampaignCreateFormDisplayed ? (
            <TwitterRuleForm name="campaignform" onSubmit={this.handleCampaignFormSubmit} cancel onCancel={this.handleCampaignFormCancel} />
        ) : (
            <div className="panel-body">
                <div>
                    You don't have campaigns actually.
                </div>
                <button id="createcampaign" type="submit" className="btn btn-success" onClick={this.handleClick}>Submit</button>
            </div>
        );
        return (
            campaignList
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountOverview);