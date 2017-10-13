import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";
import CampaignItem from "./CampaignItem";
import LoadingCog from "./LoadingCog";

class CampaignList extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        campaigns: PropTypes.arrayOf(PropTypes.shape({
            uid: PropTypes.string.isRequired,
            accountId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            dateBegin: PropTypes.string.isRequired,
            dateEnd: PropTypes.string.isRequired
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
        this.props.onClick({
            account: this.props.account.name,
            campaign: event.target.id
        });
    }

    render()
    {
        return (
            this.props.campaigns.length > 0 ? (
                <div>
                {
                    this.props.campaigns.map(campaign => (
                        <CampaignItem key={campaign.uid} id={campaign.name} onClick={this.handleClick} campaign={campaign} />
                    ))
                }
                </div>
            ) : (
                <div>There is no campaign yet.</div>
            )
        );
    }
}

export default withLanguage(CampaignList);