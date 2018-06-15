import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import Card from "../Card";
import TwitterFollowersStats from "./TwitterFollowersStats";
import TwitterActionsStats from "./TwitterActionsStats";

class TwitterAccountStats extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            TWITTERACCOUNTSTATS_TITLE: PropTypes.string.isRequired,
            TWITTERACCOUNTSTATS_NOSTATS: PropTypes.string.isRequired
        }).isRequired,
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
            TWITTERACCOUNTSTATS_TITLE,
            TWITTERACCOUNTSTATS_NOSTATS
        } = this.props.lang;
        const {
            account
        } = this.props;
        const keys = Object.keys(account.stats.interactions_per_day);
        return (
            <Card title={TWITTERACCOUNTSTATS_TITLE}>
            {
                keys.length === 0 ? (
                    <span>{TWITTERACCOUNTSTATS_NOSTATS}</span>
                ) : (
                    <Fragment>
                        <TwitterFollowersStats data={account.stats.interactions_per_day}/>
                        <TwitterActionsStats data={account.stats.interactions_per_day}/>
                    </Fragment>
                )
            }
            </Card>
        )
    }
}

export default withProps(TwitterAccountStats, [ Props.LANG ]);