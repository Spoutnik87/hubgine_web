import v4 from "uuid";
import { findIndex } from "lodash";
import * as ActionTypes from "../constants/ActionTypes";
import * as RequestTypes from "../constants/RequestTypes";
import { addMetadata } from "../util/Metadata";

const accounts = (state = {}, action) =>
{
    let accountIndex = 0;
    let campaignIndex = 0;
    let ruleIndex = 0;
    switch (action.type)
    {
        case ActionTypes.ACCOUNT_UPDATE_LIST:
            return {
                ...addMetadata(state, RequestTypes.ACCOUNT_LIST),
                data: action.accounts.map(account => {
                    return {
                        ...account,
                        uid: v4(),
                        campaigns: account.campaigns.map(campaign => ({
                            ...campaign,
                            uid: v4(),
                            config: {
                                ...campaign.config,
                                rules: campaign.config.rules.map(rule => ({
                                    ...rule,
                                    uid: v4()
                                }))
                            }
                        }))
                    };
                })
        };
        case ActionTypes.ACCOUNT_ADD:
            state.data.push({
                ...account,
                uid: v4(),
                name: action.name,
                consumerKey: action.consumerKey,
                consumerSecret: action.consumerSecret,
                accessTokenKey: action.accessTokenKey,
                accessTokenSecret: action.accessTokenSecret,
                maxCampaigns: action.maxCampaigns,
                campaigns: []
            });
            return state;
        case ActionTypes.ACCOUNT_DELETE:
            state.data = state.data.filter(account => {
                return account.name !== action.accountId;
            });
            return state;
        case ActionTypes.ACCOUNT_UPDATE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            state.data[accountIndex] = {
                ...state.data[accountIndex],
                name: action.name,
                consumerKey: action.consumerKey,
                consumerSecret: action.consumerSecret,
                accessTokenKey: action.accessTokenKey,
                accessTokenSecret: action.accessTokenSecret
            };
            return state;
        //CAMPAIGNS
        case ActionTypes.CAMPAIGN_ADD:
            accountIndex = findIndex(state.data, { name: action.accountId });
            state.data[accountIndex].campaigns.push({
                uid: v4(),
                name: action.name,
                dateBegin: action.dateBegin,
                dateEnd: action.dateEnd,
                config: action.config
            });
            return state;
        case ActionTypes.CAMPAIGN_UPDATE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            campaignIndex = findIndex(state.data[accountIndex].campaigns, { name: action.campaignId });
            state.data[accountIndex].campaigns[campaignIndex] = {
                ...state.data[accountIndex].campaigns[campaignIndex],
                name: action.name,
                dateBegin: action.dateBegin,
                dateEnd: action.dateEnd
            };
            return state;
        case ActionTypes.CAMPAIGN_DELETE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            state.data[accountIndex].campaigns = state.data[accountIndex].campaigns.filter(campaign => campaign.name !== action.campaignId);
            return state;
        case ActionTypes.TWITTERRULE_ADD:
            accountIndex = findIndex(state.data, { name: action.accountId });
            campaignIndex = findIndex(state.data[accountIndex].campaigns, { name: action.campaignId });
            if (accountIndex !== -1 && campaignIndex !== -1)
            {
                state.data[accountIndex].campaigns[campaignIndex].config.rules.push({
                    uid: v4(),
                    name: action.name,
                    type: action.action,
                    track: action.track,
                    condition: action.condition,
                    delay: action.delay,
                    undo: action.undo,
                    lang: action.lang
                });
            }
            return state;
        case ActionTypes.TWITTERRULE_UPDATE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            campaignIndex = findIndex(state.data[accountIndex].campaigns, { name: action.campaignId });
            ruleIndex = findIndex(state.data[accountIndex].campaigns[campaignIndex].config.rules, { name: action.ruleId });
            if (accountIndex !== -1 && campaignIndex !== -1 && ruleIndex !== -1)
            {
                state.data[accountIndex].campaigns[campaignIndex].config.rules[ruleIndex] = {
                    ...state.data[accountIndex].campaigns[campaignIndex].config.rules[ruleIndex],
                    name: action.name,
                    type: action.action,
                    track: action.track,
                    condition: action.condition,
                    delay: action.delay,
                    lang: action.lang
                };
            }
            return state;
        case ActionTypes.TWITTERRULE_DELETE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            campaignIndex = findIndex(state.data[accountIndex].campaigns, { name: action.campaignId });
            if (accountIndex !== -1 && campaignIndex !== -1)
            {
                state.data[accountIndex].campaigns[campaignIndex].config.rules = state.data[accountIndex].campaigns[campaignIndex].config.rules.filter(rule => rule.name !== action.ruleId);
            }
            return state;
        default:
            return state;
    }
}

export default accounts;