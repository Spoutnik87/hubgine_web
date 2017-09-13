import * as ActionTypes from "../constants/ActionTypes";

export function updateCampaignList(campaigns)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_LIST,
            campaigns
        });
    };
}

export function addCampaign(accountId, name, dateBegin, dateEnd)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_ADD,
            accountId,
            name,
            dateBegin,
            dateEnd
        });
    };
}

export function removeCampaign(accountId, campaignId)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_DELETE,
            accountId,
            campaignId
        });
    };
}

export function updateCampaign(accountId, campaignId, name, dateBegin, dateEnd)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.CAMPAIGN_UPDATE,
            accountId,
            campaignId,
            name,
            dateBegin,
            dateEnd
        });
    };
}

export function updateCampaignName(accountId, campaignId, name)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_NAME,
            accountId,
            campaignId,
            name
        });
    };
}

export function updateCampaignAccount(accountId, campaignId, newAccountId)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_ACCOUNT,
            accountId,
            campaignId,
            newAccountId
        });
    };
}

export function updateCampaignDateBegin(accountId, campaignId, dateBegin)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_DATEBEGIN,
            accountId,
            campaignId,
            dateBegin
        });
    };
}

export function updateCampaignDateEnd(accountId, campaignId, dateEnd)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CAMPAIGN_UPDATE_DATEEND,
            accountId,
            campaignId,
            dateEnd
        });
    };
}