import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import * as StatsTimeScale from "../../constants/StatsTimeScale";
import * as StatsType from "../../constants/StatsType";
import * as Heading from "../../constants/Heading";
import Nav from "../Nav";
import Card from "../Card";
import LineChart from "../charts/LineChart";
import { processAccountStats, getLastRecord,  } from "../../util/Stats";

class TwitterFollowersStats extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            TWITTERFOLLOWERSSTATS_TITLE: PropTypes.string.isRequired,
            TWITTERFOLLOWERSSTATS_LASTDAY_PILL: PropTypes.string.isRequired,
            TWITTERFOLLOWERSSTATS_LASTWEEK_PILL: PropTypes.string.isRequired,
            TWITTERFOLLOWERSSTATS_LASTMONTH_PILL: PropTypes.string.isRequired,
            TWITTERFOLLOWERSSTATS_LASTQUARTER_PILL: PropTypes.string.isRequired,
            TWITTERFOLLOWERSSTATS_LASTSEMESTER_PILL: PropTypes.string.isRequired,
            TWITTERFOLLOWERSSTATS_LASTYEAR_PILL: PropTypes.string.isRequired,
            TWITTERFOLLOWERSSTATS_YLABEL: PropTypes.string.isRequired,
            TWITTERFOLLOWERSSTATS_LASTRECORD: PropTypes.string.isRequired
        }).isRequired,
        data: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            currentTimeScale: StatsTimeScale.DAILY
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        const {
            currentTimeScale
        } = this.state;
        if (currentTimeScale !== event.value)
        {
            this.setState({
                currentTimeScale: event.value
            });
        }
    }

    render()
    {
        const {
            data: dataProps
        } = this.props;
        const {
            TWITTERFOLLOWERSSTATS_TITLE,
            TWITTERFOLLOWERSSTATS_LASTDAY_PILL,
            TWITTERFOLLOWERSSTATS_LASTWEEK_PILL,
            TWITTERFOLLOWERSSTATS_LASTMONTH_PILL,
            TWITTERFOLLOWERSSTATS_LASTQUARTER_PILL,
            TWITTERFOLLOWERSSTATS_LASTSEMESTER_PILL,
            TWITTERFOLLOWERSSTATS_LASTYEAR_PILL,
            TWITTERFOLLOWERSSTATS_YLABEL,
            TWITTERFOLLOWERSSTATS_LASTRECORD
        } = this.props.lang;
        const {
            currentTimeScale
        } = this.state;
        const pills = [
            {
                name: TWITTERFOLLOWERSSTATS_LASTYEAR_PILL,
                value: StatsTimeScale.YEARLY
            },
            {
                name: TWITTERFOLLOWERSSTATS_LASTSEMESTER_PILL,
                value: StatsTimeScale.SEMESTRIAL
            },
            {
                name: TWITTERFOLLOWERSSTATS_LASTQUARTER_PILL,
                value: StatsTimeScale.QUARTERLY
            },
            {
                name: TWITTERFOLLOWERSSTATS_LASTMONTH_PILL,
                value: StatsTimeScale.MONTHLY
            },
            {
                name: TWITTERFOLLOWERSSTATS_LASTWEEK_PILL,
                value: StatsTimeScale.WEEKLY
            },
            {
                name: TWITTERFOLLOWERSSTATS_LASTDAY_PILL,
                value: StatsTimeScale.DAILY
            }
        ];
        const data = processAccountStats(dataProps, StatsType.FOLLOWERS, currentTimeScale, false);
        const lastRecord = getLastRecord(dataProps, StatsType.FOLLOWERS);
        return (
            <Card title={TWITTERFOLLOWERSSTATS_TITLE} heading={Heading.NONE} rightTitle={<Nav items={pills} activeItem={currentTimeScale} pills onChange={this.handleChange}/>}>
                <LineChart label={TWITTERFOLLOWERSSTATS_YLABEL} data={data} yLabel={TWITTERFOLLOWERSSTATS_YLABEL}/>
                {
                    lastRecord != null && (
                        TWITTERFOLLOWERSSTATS_LASTRECORD + moment(lastRecord).format("LL")
                    )
                }
            </Card>
        );
    };
}

export default withProps(TwitterFollowersStats, [ Props.LANG ]);