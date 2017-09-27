import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CampaignTile extends Component {
    static propTypes = {
        campaign: PropTypes.shape({
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
            <div id={this.props.campaign.name} className="campaigntile" onClick={this.handleClick}>
                {this.props.campaign.name}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(CampaignTile);