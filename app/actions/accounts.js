import { findIndex } from "lodash";
import { isValidTwitterAccountName, isUniqueTwitterAccountName, isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret,
    isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret } from "validator";
import * as ActionTypes from "../constants/ActionTypes";
import * as Errors from "../constants/ErrorTypes";
import { getAccountList, updateAccount as updateAccountAPI, addAccount as addAccountAPI, removeAccount as removeAccountAPI, 
    getCampaignList, addCampaign as addCampaignAPI, removeCampaign as removeCampaignAPI, updateCampaign as updateCampaignAPI, getCampaign } from "../net/Requests";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage } from "./messages";
import { disconnect } from "./user";

export function fetchAccountList()
{
    return (dispatch, getState) => {
        const state = getState();
        const { token } = state.user;
        return getAccountList(token, state.accounts).then(result => {
            dispatch({
                type: ActionTypes.ACCOUNT_UPDATE_LIST,
                accounts: result.accounts.map(account => ({
                        name: account.name,
                        consumerKey: account.consumer_key,
                        consumerSecret: account.consumer_secret,
                        accessTokenKey: account.access_token_key,
                        accessTokenSecret: account.access_token_secret,
                        maxCampaigns: account.max_campaigns
                }))
            });
            return Promise.resolve();
        }).catch(error => {
            if (error.message === Errors.ERROR_DATA_CACHED)
            {
                return Promise.resolve();
            }
            else if (error.message === Errors.ERROR_INVALID_TOKEN)
            {
                const { SESSION_EXPIRED } = state.lang;
                dispatch(disconnect());
                dispatch(sendFailureMessage(SESSION_EXPIRED));
                return Promise.reject(error);
            }
            else
            {
                return Promise.reject(error);
            }
        });
    };
}

export function addAccount(name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret)
{
    return (dispatch, getState) => {
        const state = getState();
        const {
            TWITTERACCOUNTFORM_NAME_INCORRECT,
            TWITTERACCOUNTFORM_NAME_NOT_UNIQUE,
            TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT,
            TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT,
            TWITTERACCOUNTFORM_GENERIC_ERROR,
            TWITTERACCOUNTFORM_CREATE_SUCCESS
        } = state.lang;
        const messages = [];
        if (!isValidTwitterAccountName(name))
        {
            messages.push(TWITTERACCOUNTFORM_NAME_INCORRECT);
        }
        if (!isUniqueTwitterAccountName(name, state.accounts.data.map(account => account.name)))
        {
            messages.push(TWITTERACCOUNTFORM_NAME_NOT_UNIQUE);
        }
        if (!isValidTwitterAccountConsumerKey(consumerKey))
        {
            messages.push(TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT);
        }
        if (!isValidTwitterAccountConsumerSecret(consumerSecret))
        {
            messages.push(TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT);
        }
        if (!isValidTwitterAccountAccessTokenKey(accessTokenKey))
        {
            messages.push(TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT);
        }
        if (!isValidTwitterAccountAccessTokenSecret(accessTokenSecret))
        {
            messages.push(TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT);
        }
        if (messages.length === 0)
        {
            const { token } = state.user;
            return addAccountAPI(token, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret).then(result => {
                dispatch({
                    type: ActionTypes.ACCOUNT_ADD,
                    name: name,
                    consumerKey: consumerKey,
                    consumerSecret: consumerSecret,
                    accessTokenKey: accessTokenKey,
                    accessTokenSecret: accessTokenSecret
                });
                dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_CREATE_SUCCESS));
                return Promise.resolve();
            }).catch(error => {
                dispatch(sendFailureMessage(TWITTERACCOUNTFORM_GENERIC_ERROR));
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

export function updateAccount(accountId, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret)
{
    return (dispatch, getState) => {
        const state = getState();
        const {
            TWITTERACCOUNTFORM_NAME_INCORRECT,
            TWITTERACCOUNTFORM_NAME_NOT_UNIQUE,
            TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT,
            TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT,
            TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT,
            TWITTERACCOUNTFORM_EDIT_SUCCESS,
            TWITTERACCOUNTFORM_EDIT_ERROR
        } = state.lang;
        const {
            uid,
            name: initialName,
            consumerKey: initialConsumerKey,
            consumerSecret: initialConsumerSecret,
            accessTokenKey: initialAccessTokenKey,
            accessTokenSecret: initialAccessTokenSecret
        } = state.accounts.data[findIndex(state.accounts.data, { name: accountId })];
        const messages = [];
        if (typeof name === "string" && !isValidTwitterAccountName(name))
        {
            messages.push(TWITTERACCOUNTFORM_NAME_INCORRECT);
        }
        if (typeof name === "string" && !isUniqueTwitterAccountName(name, state.accounts.data.map(account => { if (uid !== account.uid) return account.name; })))
        {
            messages.push(TWITTERACCOUNTFORM_NAME_NOT_UNIQUE);
        }
        if (typeof consumerKey === "string" && !isValidTwitterAccountConsumerKey(consumerKey))
        {
            messages.push(TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT);
        }
        if (typeof consumerSecret === "string" && !isValidTwitterAccountConsumerSecret(consumerSecret))
        {
            messages.push(TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT);
        }
        if (typeof accessTokenKey === "string" && !isValidTwitterAccountAccessTokenKey(accessTokenKey))
        {
            messages.push(TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT);
        }
        if (typeof accessTokenSecret === "string" && !isValidTwitterAccountAccessTokenSecret(accessTokenSecret))
        {
            messages.push(TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT);
        }
        if (messages.length === 0)
        {
            const newName = name !== initialName ? name : null;
            const newConsumerKey = consumerKey !== initialConsumerKey ? consumerKey : null;
            const newConsumerSecret = consumerSecret !== initialConsumerSecret ? consumerSecret : null;
            const newAccessTokenKey = accessTokenKey !== initialAccessTokenKey ? accessTokenKey : null;
            const newAccessTokenSecret = accessTokenSecret !== initialAccessTokenSecret ? accessTokenSecret : null;
            const { token } = state.user;
            return updateAccountAPI(token, initialName, newName, newConsumerKey, newConsumerSecret, newAccessTokenKey, newAccessTokenSecret).then(result => {
                dispatch({
                    type: ActionTypes.ACCOUNT_UPDATE,
                    accountId: accountId,
                    name: name,
                    consumerKey: consumerKey,
                    consumerSecret: consumerSecret,
                    accessTokenKey: accessTokenKey,
                    accessTokenSecret: accessTokenSecret
                });
                dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_EDIT_SUCCESS));
                return Promise.resolve();
            }).catch(error => {
                if (error.message === Errors.ERROR_NO_CHANGES)
                {
                    return Promise.resolve();
                }
                else
                {
                    dispatch(sendFailureMessage(TWITTERACCOUNTFORM_EDIT_ERROR));
                    return Promise.reject(error);
                }
            });
        }
        else
        {
            dispatch(sendFailureMessages(messages));
            return Promise.reject(new Error(Errors.ERROR_INVALID_INPUTS));
        }
    };
}

export function removeAccount(accountId)
{
    return (dispatch, getState) => {
        const state = getState();
        const { token } = state.user;
        const {
            TWITTERACCOUNTFORM_DELETE_SUCCESS,
            TWITTERACCOUNTFORM_DELETE_ERROR
        } = state.lang;
        return removeAccountAPI(token, accountId).then(result => {
            dispatch({
                type: ActionTypes.ACCOUNT_DELETE,
                accountId: accountId
            });
            dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_DELETE_SUCCESS));
            return Promise.resolve();
        }).catch(error => {
            dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_DELETE_ERROR));
            return Promise.reject(error);
        });
    };
}

//CAMPAIGNS

export function fetchCampaignList()
{
    return (dispatch, getState) => {
        const state = getState();
        const { token } = state.user;
        return getCampaignList(token, null, state.campaigns).then(result => {
            dispatch({
                type: ActionTypes.CAMPAIGN_UPDATE_LIST,
                campaigns: result.campaigns.map(campaign => ({
                    accountId: campaign.account_id,
                    name: campaign.name,
                    dateBegin: campaign.date_begin,
                    dateEnd: campaign.date_end
                }))
            });
            return Promise.resolve();
        }).catch(error => {
            if (error.message === Errors.ERROR_DATA_CACHED)
            {
                return Promise.resolve();
            }
            else if (error.message === Errors.ERROR_INVALID_TOKEN)
            {
                const { SESSION_EXPIRED } = state.lang;
                dispatch(disconnect());
                dispatch(sendFailureMessage(SESSION_EXPIRED));
                return Promise.reject(error);
            }
            else
            {
                return Promise.reject(error);
            }
        });
    };
}

export function fetchCampaign(accountId, campaignId)
{
    return (dispatch, getState) => {
        const state = getState();
        const { token } = state.user;
        return getCampaign(token, accountId, campaignId, state.campaigns.data[findIndex(state.campaigns.data, { accountId: accountId, name: campaignId })]).then(result => {
            dispatch({
                type: ActionTypes.CAMPAIGN_UPDATE,
                accountId: accountId,
                campaignId: campaignId,
                name: result.name,
                dateBegin: result.date_begin,
                dateEnd: result.date_end,
                config: result.config
            });
            return Promise.resolve();
        }).catch(error => {
            if (error.message === Errors.ERROR_DATA_CACHED)
            {
                return Promise.resolve();
            }
            else if (error.message === Errors.ERROR_INVALID_TOKEN)
            {
                const { SESSION_EXPIRED } = state.lang;
                dispatch(disconnect());
                dispatch(sendFailureMessage(SESSION_EXPIRED));
                return Promise.reject(error);
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
            const { token } = state.user;
            return addCampaignAPI(token, accountId, name, dateBegin, dateEnd).then(result => {
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
        const { token } = state.user;
        return removeCampaignAPI(token, accountId, campaignId).then(result => {
            dispatch({
                type: ActionTypes.CAMPAIGN_DELETE,
                accountId,
                campaignId
            });
            dispatch(sendSuccessMessage(CAMPAIGNFORM_DELETE_SUCCESS));
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
            dateBegin: initialDateBegin,
            dateEnd: initialDateEnd
        } = state.campaigns.data[findIndex(state.campaigns.data, { accountId: accountId, name: campaignId })];
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
            const newName = name !== campaignId ? name : null;
            const newDateBegin = dateBegin !== initialDateBegin ? dateBegin : null;
            const newDateEnd = dateEnd !== initialDateEnd ? dateEnd : null;
            const { token } = state.user;
            return updateCampaignAPI(token, accountId, campaignId, newName, newDateBegin, newDateEnd).then(result => {
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