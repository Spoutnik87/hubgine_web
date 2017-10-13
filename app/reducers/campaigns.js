import v4 from "uuid";
import { findIndex } from "lodash";
import * as ActionTypes from "../constants/ActionTypes";
import * as RequestTypes from "../constants/RequestTypes";
import { addMetadata } from "../util/Metadata";

const campaigns = (state = {}, action) => {
    let id = 0;
    switch (action.type)
    {
        case ActionTypes.CAMPAIGN_UPDATE_LIST:
            return {
                ...addMetadata(state, RequestTypes.CAMPAIGN_LIST),
                data: action.campaigns.map(campaign => (
                    addMetadata({
                        ...campaign,
                        uid: v4()
                    }, RequestTypes.CAMPAIGN_BASIC)
                ))
            };
        case ActionTypes.CAMPAIGN_ADD:
            state.data.push(addMetadata({
                uid: v4(),
                accountId: action.accountId,
                name: action.name,
                dateBegin: action.dateBegin,
                dateEnd: action.dateEnd
            }), RequestTypes.CAMPAIGN_BASIC);
            return state;
        case ActionTypes.CAMPAIGN_UPDATE:
            id = findIndex(state.data, { accountId: action.accountId, name: action.campaignId });
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
            return state;
        case ActionTypes.CAMPAIGN_DELETE:
            state.data = state.data.filter(campaign => {
                return campaign.accountId !== action.accountId && campaign.name !== action.campaignId ? true : false;
            });
            return state;
        case ActionTypes.CAMPAIGN_UPDATE_NAME:
            state.data[findIndex(state.data, { accountId: action.accountId, name: action.campaignId })].name = action.name;
            return state;
        case ActionTypes.CAMPAIGN_UPDATE_ACCOUNT:
            state.data[findIndex(state.data, { accountId: action.accountId, name: action.campaignId })].accountId = action.accountId;
            return state;
        case ActionTypes.CAMPAIGN_UPDATE_DATEBEGIN:
            state.data[findIndex(state.data, { accountId: action.accountId, name: action.campaignId })].dateBegin = action.dateBegin;
            return state;
        case ActionTypes.CAMPAIGN_UPDATE_DATEEND:
            state.data[findIndex(state.data, { accountId: action.accountId, name: action.campaignId })].dateEnd = action.dateEnd;
            return state;
        default:
            return state;
    }
}

export default campaigns;