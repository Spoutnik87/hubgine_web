import * as ActionTypes from "../constants/ActionTypes";

export function updateCampaignList(campaigns)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_LIST,
            campaigns: campaigns
        });
    };
}

export function addCampaign(campaign)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_ADD,
            campaign: campaign
        });
    };
}

export function removeCampaign(campaignId)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_DELETE,
            campaignId: campaignId
        });
    };
}

export function updateCampaignName(campaignId, name)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_NAME,
            campaignId: campaignId,
            name: name
        });
    };
}

export function updateCampaignDateBegin(campaignId, dateBegin)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_DATEBEGIN,
            campaignId: campaignId,
            dateBegin: dateBegin
        });
    };
}

export function updateCampaignDateEnd(campaignId, dateEnd)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_DATEEND,
            campaignId: campaignId,
            dateEnd: dateEnd
        });
    };
}