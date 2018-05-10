import moment from "moment";
import { findIndex } from "lodash";
import * as TimeScale from "../constants/StatsTimeScale";
import * as StatsType from "../constants/StatsType";
import { parseDate } from "./Date";

/**
 * @public
 * @param {Date} date 
 * @param {TimeScale} timeScale 
 * @returns Interval
 */
const getInterval = (date, timeScale = TimeScale.MONTHLY, utc = true) => {
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
                    hour: d.getUTCHours()
                });
            }
            break;
        case TimeScale.WEEKLY:
            for (let i = 7*24; i >= 0; i--)
            {
                const d = new Date(unixDate - i * 3600000);
                keys.push({
                    date: parseDate(d),
                    hour: d.getUTCHours()
                });
            }
            break;
        case TimeScale.MONTHLY:
            for (let i = 30*24; i >= 0; i--)
            {
                const d = new Date(unixDate - i * 3600000);
                keys.push({
                    date: parseDate(d),
                    hour: d.getUTCHours()
                });
            }
            break;
        case TimeScale.QUARTERLY:
            for (let i = 90*24; i >= 0; i--)
            {
                const d = new Date(unixDate - i * 3600000);
                keys.push({
                    date: parseDate(d),
                    hour: d.getUTCHours()
                });
            }
            break;
        case TimeScale.SEMESTRIAL:
            for (let i = 180*24; i >= 0; i--)
            {
                const d = new Date(unixDate - i * 3600000);
                keys.push({
                    date: parseDate(d),
                    hour: d.getUTCHours()
                });
            }
            break;
        case TimeScale.YEARLY:
            for (let i = 360*24; i >= 0; i--)
            {
                const d = new Date(unixDate - i * 3600000);
                keys.push({
                    date: parseDate(d),
                    hour: d.getUTCHours()
                });
            }
            break;
        case TimeScale.DATE:
            for (let i = 24; i >= 0; i--)
            {
                const d = new Date(unixDate - i * 3600000);
                keys.push({
                    date: parseDate(d),
                    hour: d.getUTCHours()
                });
            }
            break;
    }
    return keys;
};

/**
 * @public
 * @param {object} interactions_per_day 
 * @param {StatsType} statsType 
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
                    case StatsType.ACTION:
                        if (entry.tweets != null || entry.retweets != null || entry.favorites != null || entry.follows != null)
                        {
                            lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        }
                        break;
                    case StatsType.TWEET:
                        if (entry.tweets != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                    case StatsType.RETWEET:
                        if (entry.retweets != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                    case StatsType.FAVORITE:
                        if (entry.favorites != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                    case StatsType.FOLLOWS:
                        if (entry.follows != null) lastRecord = new Date(Date.parse(day) + 3600000 * hour);
                        break;
                    case StatsType.FOLLOWERS:
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

const toLocalTimezone = (data, timeScale) => {
    let newData = [];
    let currentDay;
    for (const element of data)
    {
        switch (timeScale)
        {
            case TimeScale.MONTHLY:
            case TimeScale.QUARTERLY:
            case TimeScale.SEMESTRIAL:
            case TimeScale.YEARLY:
                const day = moment(element.name*1000).local().format("L");
                if (currentDay === day && element.value === 0)
                {
                    break;
                }
                else if (currentDay !== day)
                {
                    currentDay = day;
                }
                let index;
                if ((index = findIndex(newData, elem => elem.name === day)) === -1)
                {
                    newData.push({
                        name: day,
                        value: element.value
                    });
                }
                else
                {
                    newData[index].value += element.value;
                }
                break;
            default:
                newData.push({
                    name: moment.utc(element.name*1000).local().format("LLL"),
                    value: element.value
                });
                break;
        }
    }
    return newData;
};

/**
 * @public
 * @param {object} interactions_per_day Account interactions per day object.
 * @param {StatsType} statsType Stats type.
 * @param {TimeScale} timeScale StatsTimeScale constant.
 * @param {boolean} lastRecord End at last record.
 * @returns Data object to generate line chart.
 */
const processAccountStats = (interactions_per_day, statsType, timeScale = TimeScale.MONTHLY, lastRecord = true, date = undefined) => {
    let data = [];
    const lastDay = lastRecord ? getLastRecord(interactions_per_day, statsType, true).getTime() : new Date().getTime();
    const interval = getInterval(new Date(lastDay), timeScale);
    let currentDay;
    for (const key of interval)
    {
        const date = key["date"];
        const hour = key["hour"];
        let value = 0;
        switch(statsType)
        {
            case StatsType.ACTION:
                value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                    (interactions_per_day[date][hour].tweets || 0)
                    + (interactions_per_day[date][hour].retweets || 0)
                    + (interactions_per_day[date][hour].favorites || 0)
                    + (interactions_per_day[date][hour].follows || 0)
                ) : 0 : 0);
                break;
            case StatsType.TWEET:
                value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                    interactions_per_day[date][hour].tweets || 0
                ) : 0 : 0);
                break;
            case StatsType.RETWEET:
                value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                    interactions_per_day[date][hour].retweets || 0
                ) : 0 : 0);
                break;
            case StatsType.FAVORITE:
                value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                    interactions_per_day[date][hour].favorites || 0
                ) : 0 : 0);
                break;
            case StatsType.FOLLOWS:
                value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                    interactions_per_day[date][hour].follows || 0
                ) : 0 : 0);
                break;
            case StatsType.FOLLOWERS:
                value = (interactions_per_day[date] != null ? interactions_per_day[date][hour] != null ? (
                    interactions_per_day[date][hour].followers || 0
                ) : 0 : 0);
                break;

        }
        switch(timeScale)
        {
            case TimeScale.DAILY:
            case TimeScale.WEEKLY:
                data.push({
                    name: moment(Date.parse(key["date"] + " " + key["hour"] + ":00:00 UTC")).format("X"),
                    value: value
                });
                break;
            default:
                const date = moment(Date.parse(key["date"] + " " + key["hour"] + ":00:00 UTC"));
                const day = date.local().format("L");
                if (currentDay === day)
                {
                    if (value !== 0)
                    {
                        data.push({
                            name: date.format("X"),
                            value: value
                        });
                    }    
                }
                else
                {
                    currentDay = day;
                    data.push({
                        name: date.format("X"),
                        value: value
                    });
                }
        }
    }
    return toLocalTimezone(data, timeScale);
};

const processAccountActionTypesStats = (interactions_per_day, timeScale = TimeScale.MONTHLY, lastRecord = true) => {
    const lastDay = lastRecord ? getLastRecord(interactions_per_day, StatsType.ACTION, true).getTime() : new Date().getTime();
    let interval;
    let tweets = 0;
    let retweets = 0;
    let favorites = 0;
    let follows = 0;

    interval = getInterval(new Date(lastDay), timeScale);
    for (const key of interval)
    {
        const day = key["date"];
        const hour = key["hour"];
        if (interactions_per_day[day] != null && interactions_per_day[day][hour] != null)
        {
            tweets += (interactions_per_day[day][hour].tweets || 0);
            retweets += (interactions_per_day[day][hour].retweets || 0);
            favorites += (interactions_per_day[day][hour].favorites || 0);
            follows += (interactions_per_day[day][hour].follows || 0);
        }
    }

    /*switch(timeScale)
    {
        case TimeScale.DAILY:
        case TimeScale.WEEKLY:
            interval = getInterval(new Date(lastDay), timeScale);
            for (const key of interval)
            {
                const day = key["date"];
                const hour = key["hour"];
                if (interactions_per_day[day] != null && interactions_per_day[day][hour] != null)
                {
                    tweets += (interactions_per_day[day][hour].tweets || 0);
                    retweets += (interactions_per_day[day][hour].retweets || 0);
                    favorites += (interactions_per_day[day][hour].favorites || 0);
                    follows += (interactions_per_day[day][hour].follows || 0);
                }
            }
            break;
        default:
            interval = getInterval(new Date(lastDay), timeScale);
            for (const day of interval)
            {
                if (interactions_per_day[day] != null)
                {
                    for (const hour in interactions_per_day[day])
                    {
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
    }*/
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
    ];
};

export {
    processAccountStats,
    processAccountActionTypesStats,
    getLastRecord
};