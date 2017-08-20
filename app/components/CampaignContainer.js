import React, { Component } from "react";
import PropTypes from "prop-types";
import CampaignTile from "./CampaignTile";

class CampaignContainer extends Component {
    static propTypes = {
        campaigns: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            dateBegin: PropTypes.number.isRequired,
            dateEnd: PropTypes.number.isRequired,
            accountId: PropTypes.number.isRequired
        })).isRequired,
        onCampaignChange: PropTypes.func
    };

    static defaultProps = {
        onCampaignChange: () => {}
    };

    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.setState({
            selectedCampaign: ""
        });
    }

    handleClick(event)
    {

    }

    render()
    {
        return (
            <div>
                {
                    this.props.campaigns.map(campaign => (
                        <CampaignTile campaign={campaign} onClick={this.handleClick} />
                    ))
                }
            </div>
        );
    }
}

export default CampaignContainer;