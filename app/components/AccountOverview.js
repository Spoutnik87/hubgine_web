import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CampaignList from "./CampaignList";
import CampaignTile from "./CampaignTile";
import LoadingCog from "./LoadingCog";
import { getCampaignList } from "../net/Requests";
import { updateCampaignList } from "../actions/campaigns";
import { sendFailureMessage } from "../actions/messages";

class AccountOverview extends Component {
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired
        }),
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        lang: PropTypes.shape({
            GENERIC_ERROR: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
            selectedCampaign: -1
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount()
    {
        getCampaignList(this.props.user.email, this.props.user.token, null, (error, result) => {
            if (!error)
            {
                if (result)
                {
                    this.props.dispatch(updateCampaignList(result.campaigns.map(campaign => ({
                        accountId: campaign.account_id,
                        name: campaign.name,
                        dateBegin: campaign.date_begin,
                        dateEnd: campaign.date_end
                    }))));
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage("An error happened."));
            }
            this.setState({
                loading: false
            });
        });
    }
    

    handleClick(event)
    {

    }

    render()
    {
        const campaignList = !this.state.loading ? (
            this.props.campaigns.data.length > 0 ? (
                this.props.campaigns.data.map(campaign => (
                    <CampaignTile key={campaign.uid} campaign={campaign} />
                ))
            ) : (
                <div>You don't have campaign yet. Click on manage button to create one.</div>
            )
        ) : (
            <LoadingCog />
        );
        return (
            <div>
                {campaignList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        lang: state.lang,
        campaigns: state.campaigns,
        messages: state.messages
    };
};

export default connect(mapStateToProps)(AccountOverview);