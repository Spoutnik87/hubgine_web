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

    componentDidMount()
    {
        const { GENERIC_ERROR } = this.props.lang;
        /*getCampaignList(this.props.user.email, this.props.user.token, this.props.account.name, (error, result) => {
            if (!error)
            {
                if (result)
                {
                    this.props.dispatch(updateCampaignList(result.campaigns));
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage(GENERIC_ERROR));
            }
            this.setState({
                loading: true
            });
        });*/
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