import React, { Component } from "react";
import PropTypes from "prop-types";
import { withData } from "../withData";
import * as Data from "../../constants/Data";
import Card from "../Card";
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChart";

class TwitterCampaignStats extends Component {
    static propTypes = {
        campaign: PropTypes.shape({
            
        }).isRequired
    };

    /**
     * Gain de followers estimée (optionnel)
     * Actions du compte depuis son existence
     * Repartition des actions (tweets, retweets, favoris)
     */
    render()
    {
        return (
            <Card title="Lorem ipsum dolor">
                
            </Card>
        )
    }
}

export default withData(TwitterCampaignStats, [ Data.LANG ]);