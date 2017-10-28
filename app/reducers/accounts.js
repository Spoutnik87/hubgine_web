import v4 from "uuid";
import { findIndex } from "lodash";
import * as ActionTypes from "../constants/ActionTypes";
import * as RequestTypes from "../constants/RequestTypes";
import { addMetadata } from "../util/Metadata";

const accounts = (state = {}, action) =>
{
    let id = 0;
    let campaignId = 0;
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
                            uid: v4()
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
            id = findIndex(state.data, { name: action.accountId });
            state.data[id] = {
                ...state.data[id],
                name: action.name,
                consumerKey: action.consumerKey,
                consumerSecret: action.consumerSecret,
                accessTokenKey: action.accessTokenKey,
                accessTokenSecret: action.accessTokenSecret
            };
            return state;
        //CAMPAIGNS
        case ActionTypes.CAMPAIGN_ADD:
            id = findIndex(state.data, { name: action.accountId });
            state.data[id].campaigns.push({
                uid: v4(),
                name: action.name,
                dateBegin: action.dateBegin,
                dateEnd: action.dateEnd,
                config: action.config
            });
            return state;
        case ActionTypes.CAMPAIGN_UPDATE:
            id = findIndex(state.data, { name: action.accountId });
            campaignId = findIndex(state.data[id].campaigns, { name: action.campaignId });
            state.data[id].campaigns[campaignId] = {
                ...state.data[id].campaigns[campaignId],
                name: action.name,
                dateBegin: action.dateBegin,
                dateEnd: action.dateEnd
            };
            return state;
        case ActionTypes.CAMPAIGN_DELETE:
            id = findIndex(state.data, { name: action.accountId });
            state.data[id].campaigns = state.data[id].campaigns.filter(campaign => campaign.name !== action.campaignId);
            return state;
        default:
            return state;
    }
}

export default accounts;