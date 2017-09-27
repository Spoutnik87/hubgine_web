import { findIndex } from "lodash";
import { isValidCampaignName, isUniqueCampaignName, isValidCampaignAccount, isValidCampaignDateBegin, isValidCampaignDateEnd } from "validator";
import * as ActionTypes from "../constants/ActionTypes";
import * as Errors from "../constants/ErrorTypes";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage } from "./messages";
import { getCampaignList, addCampaign as addCampaignAPI, removeCampaign as removeCampaignAPI, updateCampaign as updateCampaignAPI } from "../net/Requests";

export function fetchCampaignList()
{
    return (dispatch, getState) => {
        const state = getState();
        const { email, token } = state.user;
        return getCampaignList(email, token, null, state.campaigns).then(result => {
            dispatch({
                type: ActionTypes.CAMPAIGN_UPDATE_LIST,
                campaigns: result.campaigns
            });
            return Promise.resolve();
        }).catch(error => {
            if (Errors.ERROR_DATA_CACHED)
            {
                return Promise.resolve();
            }
            else
            {
                return Promise.reject(error);
            }
        });
    };
}

export function addCampaign(accountId, name, dateBegin, dateEnd)
{
    return (dispatch, getState) => {
        const state = getState();
        const {
            CAMPAIGNFORM_NAME_INCORRECT,
            CAMPAIGNFORM_NAME_NOT_UNIQUE,
            CAMPAIGNFORM_ACCOUNT_INCORRECT,
            CAMPAIGNFORM_DATEBEGIN_INCORRECT,
            CAMPAIGNFORM_DATEEND_INCORRECT,
            CAMPAIGNFORM_DATES_INCORRECT,
            CAMPAIGNFORM_CREATE_SUCCESS, 
            CAMPAIGNFORM_GENERIC_ERROR
        } = state.lang;
        const messages = [];
        if (!isValidCampaignName(name))
        {
            messages.push(CAMPAIGNFORM_NAME_INCORRECT);
        }
        if (!isUniqueCampaignName(name, state.campaigns.data.map(campaign => campaign.name)))
        {
            messages.push(CAMPAIGNFORM_NAME_NOT_UNIQUE);
        }
        if (!isValidCampaignAccount(accountId, state.accounts.data.map(account => account.name)))
        {
            messages.push(CAMPAIGNFORM_ACCOUNT_INCORRECT);
        }
        if (!isValidCampaignDateBegin(dateBegin))
        {
            messages.push(CAMPAIGNFORM_DATEBEGIN_INCORRECT);
        }
        if (!isValidCampaignDateEnd(dateEnd))
        {
            messages.push(CAMPAIGNFORM_DATEEND_INCORRECT);
        }
        if (dateBegin >= dateEnd)
        {
            messages.push(CAMPAIGNFORM_DATES_INCORRECT);
        }
        if (messages.length === 0)
        {
            const { email, token } = state.user;
            return addCampaignAPI(email, token, accountId, name, dateBegin, dateEnd).then(result => {
                dispatch({
                    type: ActionTypes.CAMPAIGN_ADD,
                    accountId,
                    name,
                    dateBegin,
                    dateEnd
                });
                dispatch(sendSuccessMessage(CAMPAIGNFORM_CREATE_SUCCESS));
                return Promise.resolve();
            }).catch(error => {
                dispatch(sendFailureMessage(CAMPAIGNFORM_GENERIC_ERROR));
                return Promise.reject(error);
            });
        }
        else
        {
            dispatch(sendFailureMessages(messages));
            return Promise.reject(new Error(Errors.ERROR_INVALID_INPUTS));
        }
    };
}

export function removeCampaign(accountId, campaignId)
{
    return (dispatch, getState) => {
        const state = getState();
        const {
            CAMPAIGNFORM_DELETE_SUCCESS,
            CAMPAIGNFORM_DELETE_ERROR
        } = state.lang;
        const { email, token } = state.user;
        return removeCampaignAPI(email, token, accountId, campaignId).then(result => {
            dispatch({
                type: ActionTypes.CAMPAIGN_DELETE,
                accountId,
                campaignId
            });
            dispatch(sendFailureMessage(CAMPAIGNFORM_DELETE_SUCCESS));
            return Promise.resolve();
        }).catch(error => {
            dispatch(sendFailureMessage(CAMPAIGNFORM_DELETE_ERROR))
            return Promise.reject(error);
        });
    };
}

export function updateCampaign(accountId, campaignId, name, dateBegin, dateEnd)
{
    return (dispatch, getState) => {
        const state = getState();
        const {
            CAMPAIGNFORM_NAME_INCORRECT,
            CAMPAIGNFORM_NAME_NOT_UNIQUE,
            CAMPAIGNFORM_ACCOUNT_INCORRECT,
            CAMPAIGNFORM_DATEBEGIN_INCORRECT,
            CAMPAIGNFORM_DATEEND_INCORRECT,
            CAMPAIGNFORM_DATES_INCORRECT,
            CAMPAIGNFORM_EDIT_SUCCESS, 
            CAMPAIGNFORM_EDIT_ERROR
        } = state.lang;
        const {
            uid,
            accountId: initialAccountId,
            name: initialName,
            dateBegin: initialDateBegin,
            dateEnd: initialDateEnd
        } = state.campaigns.data[findIndex(state.campaigns.data, { name: campaignId })];
        const messages = [];
        if (!isValidCampaignName(name))
        {
            messages.push(CAMPAIGNFORM_NAME_INCORRECT);
        }
        if (!isUniqueCampaignName(name, state.campaigns.data.map(campaign => { if (uid !== campaign.uid) return campaign.name; })))
        {
            messages.push(CAMPAIGNFORM_NAME_NOT_UNIQUE);
        }
        if (!isValidCampaignAccount(accountId, state.accounts.data.map(account => account.name)))
        {
            messages.push(CAMPAIGNFORM_ACCOUNT_INCORRECT);
        }
        if (!isValidCampaignDateBegin(dateBegin))
        {
            messages.push(CAMPAIGNFORM_DATEBEGIN_INCORRECT);
        }
        if (!isValidCampaignDateEnd(dateEnd))
        {
            messages.push(CAMPAIGNFORM_DATEEND_INCORRECT);
        }
        if (dateBegin >= dateEnd)
        {
            messages.push(CAMPAIGNFORM_DATES_INCORRECT);
        }
        if (messages.length === 0)
        {
            const newName = name !== initialName ? name : null;
            const newDateBegin = dateBegin !== initialDateBegin ? dateBegin : null;
            const newDateEnd = dateEnd !== initialDateEnd ? dateEnd : null;
            const { email, token } = state.user;
            return updateCampaignAPI(email, token, accountId, campaignId, newName, newDateBegin, newDateEnd).then(result => {
                dispatch({
                    type: ActionTypes.CAMPAIGN_UPDATE,
                    accountId,
                    campaignId,
                    name,
                    dateBegin,
                    dateEnd
                });
                dispatch(sendSuccessMessage(CAMPAIGNFORM_EDIT_SUCCESS));
                return Promise.resolve();
            }).catch(error => {
                dispatch(sendFailureMessage(CAMPAIGNFORM_EDIT_ERROR));
                return Promise.reject(error);
            });
        }
        else
        {
            dispatch(sendFailureMessages(messages));
            return Promise.reject(new Error(Errors.ERROR_INVALID_INPUTS));
        }
    };
}