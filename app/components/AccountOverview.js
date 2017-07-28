import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CampaignCreateForm from "./Forms/CampaignCreateForm";

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
            isCampaignCreateFormDisplayed: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {

    }

    componentDidMount()
    {
        
    }

    render()
    {
        return (
            <div className="panel-body">
                <div>
                    You don't have campaigns actually.
                </div>
                <button type="submit" className="btn btn-success" onClick={this.handleClick}>Submit</button>
                <CampaignCreateForm name="campaignform" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountOverview);