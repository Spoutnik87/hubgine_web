import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
            noCampaign: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {

    }

    render()
    {
        const noCampaign = this.state.noCampaign ? <div>You don't have campaign yet. Click on manage button to create one.</div> : undefined;
        return (
            <div>
                {noCampaign}
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