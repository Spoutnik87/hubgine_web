import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CampaignTile from "./CampaignTile";

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
            noCampaign: true,
            selectedCampaign: -1
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {

    }

    render()
    {
        const noCampaign = <div>You don't have campaign yet. Click on manage button to create one.</div>;

        return (
            <div>
                {
                    this.state.noCampaign ? noCampaign :
                    this.props.campaigns.map(campaign => (
                        <CampaignTile campaign={campaign} />
                    ))
                }
                {/*<CampaignTile campaign={{
                    name: "First campaign",
                    dateBegin: 0,
                    dateEnd: 0
                }} />*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        campaigns: state.campaigns,
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountOverview);