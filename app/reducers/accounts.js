import v4 from "uuid/v4";
import { findIndex, unset } from "lodash";
import * as ActionType from "../constants/ActionType";
import * as RequestType from "../constants/RequestType";
import { addMetadata } from "../util/Metadata";

/**
 * Accounts reducer.
 * @param {Object<any,any>} state Accounts store state.
 * @param {string} action ActionType.
 */
const accounts = (state = {}, action) => {
    let accountIndex = 0;
    let campaignIndex = 0;
    let ruleIndex = 0;
    switch (action.type)
    {
        case ActionType.ACCOUNT_UPDATE_LIST:
            return {
                ...addMetadata(state, RequestType.ACCOUNT_LIST),
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
        case ActionType.ACCOUNT_ADD:
            state.data.push({
                uid: v4(),
                name: action.name,
                consumerKey: action.consumerKey,
                consumerSecret: action.consumerSecret,
                accessTokenKey: action.accessTokenKey,
                accessTokenSecret: action.accessTokenSecret,
                maxCampaigns: action.maxCampaigns,
                blacklist: action.blacklist,
                campaigns: [],
                stats: {
                    interactions_per_day: {}
                }
            });
            return state;
        case ActionType.ACCOUNT_DELETE:
            state.data = state.data.filter(account => {
                return account.name !== action.accountId;
            });
            return state;
        case ActionType.ACCOUNT_UPDATE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            state.data[accountIndex] = {
                ...state.data[accountIndex],
                name: action.name,
                consumerKey: action.consumerKey,
                consumerSecret: action.consumerSecret,
                accessTokenKey: action.accessTokenKey,
                accessTokenSecret: action.accessTokenSecret,
                blacklist: action.blacklist
            };
            return state;
        //CAMPAIGNS
        case ActionType.CAMPAIGN_ADD:
            accountIndex = findIndex(state.data, { name: action.accountId });
            state.data[accountIndex].campaigns.push({
                uid: v4(),
                name: action.name,
                dateBegin: action.dateBegin,
                dateEnd: action.dateEnd,
                config: action.config
            });
            return state;
        case ActionType.CAMPAIGN_UPDATE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            campaignIndex = findIndex(state.data[accountIndex].campaigns, { name: action.campaignId });
            state.data[accountIndex].campaigns[campaignIndex] = {
                ...state.data[accountIndex].campaigns[campaignIndex],
                name: action.name,
                dateBegin: action.dateBegin,
                dateEnd: action.dateEnd
            };
            return state;
        case ActionType.CAMPAIGN_DELETE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            state.data[accountIndex].campaigns = state.data[accountIndex].campaigns.filter(campaign => campaign.name !== action.campaignId);
            return state;
        case ActionType.TWITTERRULE_ADD:
            accountIndex = findIndex(state.data, { name: action.accountId });
            campaignIndex = findIndex(state.data[accountIndex].campaigns, { name: action.campaignId });
            if (accountIndex !== -1 && campaignIndex !== -1)
            {
                state.data[accountIndex].campaigns[campaignIndex].config.rules.push({
                    uid: v4(),
                    name: action.name,
                    type: action.action,
                    messages: action.messages,
                    track: action.track,
                    condition: action.condition,
                    delay: action.delay,
                    undo: action.undo,
                    lang: action.lang
                });
            }
            return state;
        case ActionType.TWITTERRULE_UPDATE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            campaignIndex = findIndex(state.data[accountIndex].campaigns, { name: action.campaignId });
            ruleIndex = findIndex(state.data[accountIndex].campaigns[campaignIndex].config.rules, { name: action.ruleId });
            if (accountIndex !== -1 && campaignIndex !== -1 && ruleIndex !== -1)
            {
                const rule = {
                    ...state.data[accountIndex].campaigns[campaignIndex].config.rules[ruleIndex],
                    name: action.name,
                    type: action.action,
                    messages: action.messages,
                    track: action.track,
                    condition: action.condition,
                    delay: action.delay,
                    lang: action.lang
                };
                if (action.action != 0)
                {
                    unset(rule, "messages");
                }
                state.data[accountIndex].campaigns[campaignIndex].config.rules[ruleIndex] = rule;
            }
            return state;
        case ActionType.TWITTERRULE_DELETE:
            accountIndex = findIndex(state.data, { name: action.accountId });
            campaignIndex = findIndex(state.data[accountIndex].campaigns, { name: action.campaignId });
            if (accountIndex !== -1 && campaignIndex !== -1)
            {
                state.data[accountIndex].campaigns[campaignIndex].config.rules = state.data[accountIndex].campaigns[campaignIndex].config.rules.filter(rule => rule.name !== action.ruleId);
            }
            return state;
        case ActionType.ACCOUNTS_UNSET:
            return {
                data: []
            };
        default:
            return state;
    }
};

export default accounts;