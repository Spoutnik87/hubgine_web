import * as ActionTypes from "../constants/ActionTypes";
import v4 from "uuid";

const campaigns = (state = [], action) =>
{
    switch (action.type)
    {
        case ActionTypes.CAMPAIGN_UPDATE_LIST:
            return action.campaigns.map(campaign => {
                campaign.uid = v4();
                return campaign;
            });
        case ActionTypes.CAMPAIGN_ADD:
            action.campaign.uid = v4();
            return [ ...state, action.campaign ];
        case ActionTypes.CAMPAIGN_DELETE:
            return state.filter(campaign => {
                return campaign.name !== action.campaignId ? true : false;
            });
        case ActionTypes.CAMPAIGN_UPDATE_NAME:
            state[action.campaignId].name = action.name;
            return state;
        case ActionTypes.CAMPAIGN_UPDATE_DATEBEGIN:
            state[action.campaignId].dateBegin = action.dateBegin;
            return state;
        case ActionTypes.CAMPAIGN_UPDATE_DATEEND:
            state[action.campaignId].dateEnd = action.dateEnd;
            return state;
        default:
            return state;
    }
}

export default campaigns;