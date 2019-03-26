import React, { Component } from "react";
import PropTypes from "prop-types";
import { withProps } from "./withProps";
import * as Props from "../constants/Props";

class CampaignItem extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            CAMPAIGNITEM_RUNNING: PropTypes.string.isRequired,
            CAMPAIGNITEM_NOTRUNNING: PropTypes.string.isRequired
        }).isRequired,
        campaign: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            dateBegin: PropTypes.number.isRequired,
            dateEnd: PropTypes.number.isRequired
        }).isRequired,
        onClick: PropTypes.func
    };

    static defaultProps = {
        onClick: () => {}
    };

    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {
        const {
            campaign
        } = this.props;
        this.props.onClick({
            name: campaign.name
        });
    }

    render()
    {
        const {
            CAMPAIGNITEM_RUNNING,
            CAMPAIGNITEM_NOTRUNNING
        } = this.props.lang;
        const {
            campaign
        } = this.props;
        const now = Math.round(Date.now()/1000);
        const running = now >= campaign.dateBegin && now <= campaign.dateEnd;
        return (
            <div className={(running ? "campaignitem-running" : "campaignitem-notrunning") + " campaignitem col-md-4 col-sm-6 col-xs-12"} onClick={this.handleClick}>
                {campaign.name}
                {
                    running ? (
                        <span className="right-align">{CAMPAIGNITEM_RUNNING}</span>
                    ) : (
                        <span className="right-align">{CAMPAIGNITEM_NOTRUNNING}</span>
                    )
                }
            </div>
        );
    }
}

export default withProps(CampaignItem, [ Props.LANG ]);