import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { values } from "lodash";
import { withLanguage } from "./withLanguage";
import * as StatsTimeScale from "../constants/StatsTimeScale";
import * as StatsTypes from "../constants/StatsTypes";
import Card from "./Card";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";
import { parseDate } from "../util/Date";
import { processAccountStats, processAccountActionTypesStats } from "../util/Stats";

class AccountStats extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired,
            stats: PropTypes.shape({
                interactions_per_day: PropTypes.object.isRequired
            }).isRequired
        }).isRequired
    };

    /**
     * Gain de followers
     * Actions du compte depuis son existence
     * Repartition des actions (tweets, retweets, favoris)
     */
    render()
    {
        const {
            account
        } = this.props;
        console.log(account);
        const keys = Object.keys(account.stats.interactions_per_day);
        let data = processAccountStats(account.stats.interactions_per_day, StatsTypes.FOLLOWERS, StatsTimeScale.DAILY);
        let data2 = processAccountActionTypesStats(account.stats.interactions_per_day, StatsTimeScale.WEEKLY);
        return (
            <Card title="Lorem ipsum dolor">
            {
                keys.length === 0 ? (
                    <span>No statistics currently available.</span>
                ) : (
                    <Fragment>
                        <LineChart yLabel="Actions" data={data}/>
                        <PieChart data={data2} legend label/>
                    </Fragment>
                )
            }
            </Card>
        )
    }
}

export default withLanguage(AccountStats);