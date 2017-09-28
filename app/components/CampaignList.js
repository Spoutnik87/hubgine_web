import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendFailureMessage } from "../actions/messages";
import { updateCampaignList } from "../actions/campaigns";
import { getCampaignList } from "../net/Requests";
import CampaignTile from "./CampaignTile";
import LoadingCog from "./LoadingCog";

class CampaignList extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        campaigns: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.shape({
                accountId: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                dateBegin: PropTypes.number.isRequired,
                dateEnd: PropTypes.number.isRequired
            })).isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loading: false,
            selectedCampaign: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {

    }

    render()
    {
        return this.state.loading ? (
            <LoadingCog />
        ) : (
            <div>
                {
                    this.props.campaigns.data.map(campaign => (
                        <CampaignTile campaign={campaign} onClick={this.handleClick} />
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        campaigns: state.campaigns,
        lang: state.lang
    };
};

export default connect(mapStateToProps)(CampaignList);