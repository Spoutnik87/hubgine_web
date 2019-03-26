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
import PieChart from "../charts/PieChart";
import { processAccountStats, getLastRecord, processAccountActionTypesStats,  } from "../../util/Stats";
import Row from "../Row";

class TwitterActionsStats extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            TWITTERACTIONSSTATS_TITLE: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_LASTDAY_PILL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_LASTWEEK_PILL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_LASTMONTH_PILL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_LASTQUARTER_PILL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_LASTSEMESTER_PILL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_LASTYEAR_PILL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_ACTIONS_YLABEL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_TWEETS_YLABEL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_RETWEETS_YLABEL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_FAVORITES_YLABEL: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_ACTIONS_OPTION: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_TWEETS_OPTION: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_RETWEETS_OPTIONS: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_FAVORITES_OPTIONS: PropTypes.string.isRequired,
            TWITTERACTIONSSTATS_LASTRECORD: PropTypes.string.isRequired
        }).isRequired,
        data: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            currentTimeScale: StatsTimeScale.DAILY,
            currentStatsType: StatsType.ACTION
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        if (event.name === "navStatsTimeScale")
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
        else
        {
            const {
                currentStatsType
            } = this.state;
            if (currentStatsType !== event.value)
            {
                this.setState({
                    currentStatsType: event.value
                });
            }    
        }
    }

    render()
    {
        const {
            data: dataProps
        } = this.props;
        const {
            TWITTERACTIONSSTATS_TITLE,
            TWITTERACTIONSSTATS_LASTDAY_PILL,
            TWITTERACTIONSSTATS_LASTWEEK_PILL,
            TWITTERACTIONSSTATS_LASTMONTH_PILL,
            TWITTERACTIONSSTATS_LASTQUARTER_PILL,
            TWITTERACTIONSSTATS_LASTSEMESTER_PILL,
            TWITTERACTIONSSTATS_LASTYEAR_PILL,
            TWITTERACTIONSSTATS_ACTIONS_YLABEL,
            TWITTERACTIONSSTATS_TWEETS_YLABEL,
            TWITTERACTIONSSTATS_RETWEETS_YLABEL,
            TWITTERACTIONSSTATS_FAVORITES_YLABEL,
            TWITTERACTIONSSTATS_ACTIONS_OPTION,
            TWITTERACTIONSSTATS_TWEETS_OPTION,
            TWITTERACTIONSSTATS_RETWEETS_OPTIONS,
            TWITTERACTIONSSTATS_FAVORITES_OPTIONS,
            TWITTERACTIONSSTATS_LASTRECORD
        } = this.props.lang;
        const {
            currentTimeScale,
            currentStatsType
        } = this.state;
        const pills = [
            {
                name: TWITTERACTIONSSTATS_LASTYEAR_PILL,
                value: StatsTimeScale.YEARLY
            },
            {
                name: TWITTERACTIONSSTATS_LASTSEMESTER_PILL,
                value: StatsTimeScale.SEMESTRIAL
            },
            {
                name: TWITTERACTIONSSTATS_LASTQUARTER_PILL,
                value: StatsTimeScale.QUARTERLY
            },
            {
                name: TWITTERACTIONSSTATS_LASTMONTH_PILL,
                value: StatsTimeScale.MONTHLY
            },
            {
                name: TWITTERACTIONSSTATS_LASTWEEK_PILL,
                value: StatsTimeScale.WEEKLY
            },
            {
                name: TWITTERACTIONSSTATS_LASTDAY_PILL,
                value: StatsTimeScale.DAILY
            }
        ];
        const options = [
            {
                name: TWITTERACTIONSSTATS_ACTIONS_OPTION,
                value: StatsType.ACTION
            },
            {
                name: TWITTERACTIONSSTATS_TWEETS_OPTION,
                value: StatsType.TWEET
            },
            {
                name: TWITTERACTIONSSTATS_RETWEETS_OPTIONS,
                value: StatsType.RETWEET
            },
            {
                name: TWITTERACTIONSSTATS_FAVORITES_OPTIONS,
                value: StatsType.FAVORITE
            }
        ];
        const data = processAccountStats(dataProps, currentStatsType, currentTimeScale, false);
        const dataPie = processAccountActionTypesStats(dataProps, currentTimeScale, false);
        const lastRecord = getLastRecord(dataProps, currentTimeScale);
        let yLabel;
        switch(currentStatsType)
        {
            case StatsType.ACTION:
                yLabel = TWITTERACTIONSSTATS_ACTIONS_YLABEL;
                break;
            case StatsType.TWEET:
                yLabel = TWITTERACTIONSSTATS_TWEETS_YLABEL;
                break;
            case StatsType.RETWEET:
                yLabel = TWITTERACTIONSSTATS_RETWEETS_YLABEL;
                break;
            case StatsType.FAVORITE:
                yLabel = TWITTERACTIONSSTATS_FAVORITES_YLABEL;
                break;
            default:
                yLabel = TWITTERACTIONSSTATS_ACTIONS_YLABEL;
        }
        return (
            <Card title={TWITTERACTIONSSTATS_TITLE} heading={Heading.NONE} rightTitle={<Nav name="navStatsTimeScale" items={pills} activeItem={currentTimeScale} pills onChange={this.handleChange}/>}>
                <Row>
                    <div className="col-xs-12 col-sm-3 col-md-2">
                        <Nav items={options} activeItem={currentStatsType} pills vertical onChange={this.handleChange}/>
                    </div>
                    <div className="col-xs-12 col-sm-9 col-md-10">
                        <LineChart label={yLabel} data={data} yLabel={yLabel}/>
                        <PieChart data={dataPie} label legend/>
                    </div>
                </Row>
                {
                    lastRecord != null && (
                        TWITTERACTIONSSTATS_LASTRECORD + moment(lastRecord).format("LL")
                    )
                }
            </Card>
        );
    };
}

export default withProps(TwitterActionsStats, [ Props.LANG ]);