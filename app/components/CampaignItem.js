import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";

class CampaignItem extends Component {
    static propTypes = {
        campaign: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            dateBegin: PropTypes.string.isRequired,
            dateEnd: PropTypes.string.isRequired
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
        this.props.onClick(event);
    }

    render()
    {
        return (
            <div id={this.props.campaign.name} className="campaignitem col-md-4" onClick={this.handleClick}>
                {this.props.campaign.name}
            </div>
        );
    }
}

export default withLanguage(CampaignItem);