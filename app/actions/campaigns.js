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

export function removeCampaign(campaign_id)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_DELETE,
            campaign_id: campaign_id
        });
    };
}

export function updateCampaignName(campaign_id, name)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_NAME,
            campaign_id: campaign_id,
            name: name
        });
    };
}

export function updateCampaignDateBegin(campaign_id, dateBegin)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_DATEBEGIN,
            campaign_id: campaign_id,
            dateBegin: dateBegin
        });
    };
}

export function updateCampaignDateEnd(campaign_id, dateEnd)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_DATEEND,
            campaign_id: campaign_id,
            dateEnd: dateEnd
        });
    };
}