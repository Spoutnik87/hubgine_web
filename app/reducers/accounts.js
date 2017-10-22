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
                    return addMetadata({
                        uid: v4(),
                        ...account,
                        campaigns: []
                    }, RequestTypes.ACCOUNT_BASIC);
                })
        };
        case ActionTypes.ACCOUNT_ADD:
            let account = addMetadata({
                name: action.name
            }, RequestTypes.ACCOUNT_BASIC);
            if (action.consumerKey && action.consumerSecret && action.accessTokenKey && action.accessTokenSecret)
            {
                account = addMetadata({
                    ...account,
                    consumerKey: action.consumerKey,
                    consumerSecret: action.consumerSecret,
                    accessTokenKey: action.accessTokenKey,
                    accessTokenSecret: action.accessTokenSecret,
                    campaigns: []
                }, RequestTypes.ACCOUNT_BASIC);
            }
            state.data.push({
                ...account,
                uid: v4()
            });
            return state;
        case ActionTypes.ACCOUNT_DELETE:
            state.data = state.data.filter(account => {
                return account.name !== action.accountId ? true : false;
            });
            return state;
        case ActionTypes.ACCOUNT_UPDATE:
            id = findIndex(state.data, { name: action.accountId });
            state.data[id] = addMetadata({
                ...state.data[id],
                name: action.name,
                consumerKey: action.consumerKey,
                consumerSecret: action.consumerSecret,
                accessTokenKey: action.accessTokenKey,
                accessTokenSecret: action.accessTokenSecret
            }, RequestTypes.ACCOUNT_BASIC);
            return state;
        //CAMPAIGNS
        case ActionTypes.CAMPAIGN_UPDATE_LIST:
            for (let i = 0; i < action.campaigns; i++)
            {
                id = findIndex(state.data, { name: action.campaigns[i].accountId });
                state.data[id].campaigns.push({
                    ...action.campaigns[i],
                    uid: v4()
                }, RequestTypes.CAMPAIGN_BASIC);
            }
            return addMetadata(state, RequestTypes.CAMPAIGN_LIST);
            /*state.data[id].campaigns = action.campaigns.map(campaign => (
                addMetadata({
                    ...campaign,
                    uid: v4()
                }, RequestTypes.CAMPAIGN_BASIC)
            ));
            return addMetadata(state, RequestTypes.CAMPAIGN_LIST);*/
            /*return {
                ...addMetadata(state, RequestTypes.CAMPAIGN_LIST),
                data: action.campaigns.map(campaign => (
                    addMetadata({
                        ...campaign,
                        uid: v4()
                    }, RequestTypes.CAMPAIGN_BASIC)
                ))
            };*/
        case ActionTypes.CAMPAIGN_ADD:
            id = findIndex(state.data, { name: action.accountId });
            state.data[id].campaigns.push(addMetadata({
                uid: v4(),
                accountId: action.accountId,
                name: action.name,
                dateBegin: action.dateBegin,
                dateEnd: action.dateEnd
            }), RequestTypes.CAMPAIGN_BASIC);
            return state;
        case ActionTypes.CAMPAIGN_UPDATE:
            id = findIndex(state.data, { name: action.accountId });
            campaignId = findIndex(state.data[id].campaigns, { name: action.campaignId });
            if (action.config)
            {
                state.data[id].campaigns[campaignId] = addMetadata({
                    ...state.data[id].campaigns[campaignId],
                    accountId: action.accountId,
                    name: action.name,
                    dateBegin: action.dateBegin,
                    dateEnd: action.dateEnd,
                    config: action.config
                }, RequestTypes.CAMPAIGN_FULL);
            }
            else
            {
                state.data[id].campaigns[campaignId] = addMetadata({
                    ...state.data[id].campaigns[campaignId],
                    accountId: action.accountId,
                    name: action.name,
                    dateBegin: action.dateBegin,
                    dateEnd: action.dateEnd
                }, RequestTypes.CAMPAIGN_BASIC);
            }
            return state;
            /*id = findIndex(state.data, { accountId: action.accountId, name: action.campaignId });
            if (id === -1) id = 0;
            if (action.config)
            {
                state.data[id] = addMetadata({
                    ...state.data[id],
                    accountId: action.accountId,
                    name: action.name,
                    dateBegin: action.dateBegin,
                    dateEnd: action.dateEnd,
                    config: action.config
                }, RequestTypes.CAMPAIGN_FULL);
            }
            else
            {
                state.data[id] = addMetadata({
                    ...state.data[id],
                    accountId: action.accountId,
                    name: action.name,
                    dateBegin: action.dateBegin,
                    dateEnd: action.dateEnd
                }, RequestTypes.CAMPAIGN_BASIC);
            }
            return state;*/
        case ActionTypes.CAMPAIGN_DELETE:
            id = findIndex(state.data, { name: action.accountId });
            state.data[id].campaigns = state.data[id].campaigns.filter(campaign => campaign.name !== action.campaignId);
            return state;
            /*state.data = state.data.filter(campaign => {
                return campaign.accountId !== action.accountId && campaign.name !== action.campaignId ? true : false;
            });
            return state;*/
        default:
            return state;
    }
}

export default accounts;