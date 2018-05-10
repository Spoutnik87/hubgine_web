import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";
import CampaignItem from "./CampaignItem";
import LoadingCog from "./LoadingCog";

class CampaignList extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            CAMPAIGNLIST_NOCAMPAIGN: PropTypes.string.isRequired
        }).isRequired,
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        campaigns: PropTypes.arrayOf(PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            dateBegin: PropTypes.number.isRequired,
            dateEnd: PropTypes.number.isRequired
        })).isRequired,
        onClick: PropTypes.func
    };

    static defaultProps = {
        onClick: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            selectedCampaign: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {
        const {
            account
        } = this.props;
        this.props.onClick({
            account: account.name,
            campaign: event.name
        });
    }

    render()
    {
        const {
            CAMPAIGNLIST_NOCAMPAIGN
        } = this.props.lang;
        const {
            campaigns
        } = this.props;
        return campaigns.length > 0 ? (
            <div>
            {
                campaigns.map(campaign => (
                    <CampaignItem key={campaign.uid} campaign={campaign} onClick={this.handleClick}/>
                ))
            }
            </div>
        ) : (
            <div>{CAMPAIGNLIST_NOCAMPAIGN}</div>
        );
    }
}

export default withLanguage(CampaignList);