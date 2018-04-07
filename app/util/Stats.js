import * as TimeScale from "../constants/StatsTimeScale";
import * as StatsTypes from "../constants/StatsTypes";
import { parseDate } from "./Date";

/**
 * @public
 * @param {Date} date 
 * @param {TimeScale} timeScale 
 * @returns Interval
 */
const getInterval = (date, timeScale = TimeScale.MONTHLY) => {
    let keys = [];
    const unixDate = date.getTime();
    switch(timeScale)
    {
        case TimeScale.DAILY:
            for (let i = 24; i >= 0; i--)
            {
                const d = new Date(unixDate - i * 3600000);
                keys.push({
                    date: parseDate(d),
                    hour: d.getHours()
                });
            }
            break;
        case TimeScale.WEEKLY:
            for (let i = 7; i >= 0; i--)
            {
                keys.push(parseDate(new Date(unixDate - i * 86400000)));
            }
            break;
        case TimeScale.MONTHLY:
            for (let i = 30; i >= 0; i--)
            {
                keys.push(parseDate(new Date(unixDate - i * 86400000)));
            }
            break;
        case TimeScale.QUATERLY:
            for (let i = 90; i >= 0; i--)
            {
                keys.push(parseDate(new Date(unixDate - i * 86400000)));
            }
            break;
        case TimeScale.SEMESTRIAL:
            for (let i = 180; i >= 0; i--)
            {
                keys.push(parseDate(new Date(unixDate - i * 86400000)));
            }
            break;
        case TimeScale.YEARLY:
            for (let i = 360; i >= 0; i--)
            {
                keys.push(parseDate(new Date(unixDate - i * 86400000)));
            }
            break;
    }
    return keys;
};

/**
 * @public
 * @param {object} interactions_per_day 
 * @param {StatsTypes} statsType 
 * @param {boolean} now 
 * @returns Last record date. If there is no record return undefined or current date if now is set.
 */
const getLastRecord = (interactions_per_day, statsType, now = false) => {
    const days = Object.keys(interactions_per_day);
    let lastRecord;
    if (days.length > 0)
    {
        for (let i = days.length-1; i >= 0; i--)
        {
            const day = days[i];
            const hours = Object.keys(interactions_per_day[day]);
            for (let j = hours.length-1; j >= 0; j--)
            {
                const hour = hours[j];
                const entry = interactions_per_day[day][hour];
                switch(statsType)
                {
                    case StatsTypes.ACTION:
                        if (entry.tweets != null || entry.retweets != null || entry.favorites != null || entry.follows != null)
                        {
                            lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        }
                        break;
                    case StatsTypes.TWEET:
                        if (entry.tweets != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                    case StatsTypes.RETWEET:
                        if (entry.retweets != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                    case StatsTypes.FAVORITE:
                        if (entry.favorites != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                    case StatsTypes.FOLLOWS:
                        if (entry.follows != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                    case StatsTypes.FOLLOWERS:
                        if (entry.followers != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                }
                if (lastRecord != null)
                {
                    break;
                }
            }
            if (lastRecord != null)
            {
                break;
            }
        }
    }
    else
    {
        if (now)
        {
            lastRecord = new Date();
        }
        else
        {
            lastRecord = undefined;
        }
    }
    return lastRecord;
};

/**
 * @public
 * @param {object} interactions_per_day Account interactions per day object.
 * @param {StatsTypes} statsType Stats type.
 * @param {TimeScale} timeScale StatsTimeScale constant.
 * @returns Data object to generate line chart.
 */
const processAccountStats = (interactions_per_day, statsType, timeScale = TimeScale.MONTHLY) => {
    let data = [];
    const lastDay = getLastRecord(interactions_per_day, statsType, true).getTime();
    const interval = getInterval(new Date(lastDay), timeScale);
    switch (timeScale)
    {
        case TimeScale.DAILY:
            for (const key of interval)
            {
                const date = key["date"];
                const hour = key["hour"];
                let value = 0;
                switch(statsType)
                {
                    case StatsTypes.ACTION:
                        value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                            (interactions_per_day[date][hour].tweets || 0)
                            + (interactions_per_day[date][hour].retweets || 0)
                            + (interactions_per_day[date][hour].favorites || 0)
                            + (interactions_per_day[date][hour].follows || 0)
                        ) : 0 : 0);
                        break;
                    case StatsTypes.TWEET:
                        value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                            interactions_per_day[date][hour].tweets || 0
                        ) : 0 : 0);
                        break;
                    case StatsTypes.RETWEET:
                        value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                            interactions_per_day[date][hour].retweets || 0
                        ) : 0 : 0);
                        break;
                    case StatsTypes.FAVORITE:
                        value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                            interactions_per_day[date][hour].favorites || 0
                        ) : 0 : 0);
                        break;
                    case StatsTypes.FOLLOWS:
                        value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                            interactions_per_day[date][hour].follows || 0
                        ) : 0 : 0);
                        break;
                    case StatsTypes.FOLLOWERS:
                        value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                            interactions_per_day[date][hour].followers || 0
                        ) : 0 : 0);
                        break;

                }
                data.push({
                    name: key["hour"],
                    value: value
                });
            }
            break;
        default:
            for (const day of interval)
            {
                let value = 0;
                if (interactions_per_day[day] != null)
                {
                    for (const hour in interactions_per_day[day]) {
                        if (interactions_per_day[day].hasOwnProperty(hour))
                        {
                            switch(statsType)
                            {
                                case StatsTypes.ACTION:
                                    value += ((interactions_per_day[day][hour].tweets || 0) 
                                    + (interactions_per_day[day][hour].retweets || 0)
                                    + (interactions_per_day[day][hour].favorites || 0)
                                    + (interactions_per_day[day][hour].follows || 0));
                                    break;
                                case StatsTypes.TWEET:
                                    value += (interactions_per_day[day][hour].tweets || 0);
                                    break;
                                case StatsTypes.RETWEET:
                                    value += (interactions_per_day[day][hour].retweets || 0);
                                    break;
                                case StatsTypes.FAVORITE:
                                    value += (interactions_per_day[day][hour].favorites || 0);
                                    break;
                                case StatsTypes.FOLLOWS:
                                    value += (interactions_per_day[day][hour].follows || 0);
                                    break;
                                case StatsTypes.FOLLOWERS:
                                    value += (interactions_per_day[day][hour].followers || 0);
                                    break;
                            }
                        }
                    }
                }
                data.push({
                    name: day,
                    value: value
                });
            }
    }
    return data;
};

const processAccountActionTypesStats = (interactions_per_day, timeScale = TimeScale.MONTHLY) => {
    const days = Object.keys(interactions_per_day);
    const lastDay = days.length === 0 ? new Date().getTime() : Date.parse(days[days.length-1]);
    let interval;
    let tweets = 0;
    let retweets = 0;
    let favorites = 0;
    let follows = 0;

    switch(timeScale)
    {
        case TimeScale.DAILY:
            interval = getInterval(new Date(lastDay), TimeScale.DAILY);
            for (const key of interval)
            {
                if (interactions_per_day[key["date"]] != null)
                {
                    
                }
            }
            break;
        case TimeScale.MONTHLY:
            interval = getInterval(new Date(lastDay), TimeScale.MONTHLY);
            for (const day of interval)
            {
                if (interactions_per_day[day] != null)
                {
                    for (const hour in interactions_per_day[day]) {
                        if (interactions_per_day[day].hasOwnProperty(hour))
                        {
                            tweets += (interactions_per_day[day][hour].tweets || 0);
                            retweets += (interactions_per_day[day][hour].retweets || 0);
                            favorites += (interactions_per_day[day][hour].favorites || 0);
                            follows += (interactions_per_day[day][hour].follows || 0);
                        }
                    }
                }
            }
            break;
    }
    return [
        {
            name: "Tweets",
            value: tweets
        },
        {
            name: "Retweets",
            value: retweets
        },
        {
            name: "Favorites",
            value: favorites
        }
    ]
};

export {
    processAccountStats,
    processAccountActionTypesStats
};