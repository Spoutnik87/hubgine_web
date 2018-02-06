import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";

class CampaignItem extends Component {
    static propTypes = {
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
        this.props.onClick(event);
    }

    render()
    {
        const { campaign } = this.props;
        return (
            <div id={campaign.name} className="campaignitem col-md-4 col-sm-6 col-xs-12" onClick={this.handleClick}>
                {campaign.name}
            </div>
        );
    }
}

export default withLanguage(CampaignItem);