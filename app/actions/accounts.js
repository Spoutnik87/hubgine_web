import { findIndex } from "lodash";
import { isValidTwitterAccountName, isUniqueTwitterAccountName, isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret,
    isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret, isValidCampaignName, isUniqueCampaignName, isValidCampaignAccount, isValidCampaignDateBegin, isValidCampaignDateEnd,
    isValidTwitterRuleName, isUniqueTwitterRuleName, isValidTwitterRuleAction, isValidTwitterRuleCondition, isValidTwitterRuleKeyword, isValidTwitterRuleLanguages, isValidTwitterRuleDelay, isValidTwitterRuleUndo } from "validator";
import * as ActionTypes from "../constants/ActionTypes";
import * as Status from "../constants/RequestStatus";
import * as TwitterRuleTypes from "../constants/TwitterRuleTypes";
import * as TwitterRuleConditions from "../constants/TwitterRuleConditions";
import * as TwitterRuleLangs from "../constants/TwitterRuleLangs";
import { getAccountList, updateAccount as updateAccountAPI, addAccount as addAccountAPI, removeAccount as removeAccountAPI, 
    addCampaign as addCampaignAPI, removeCampaign as removeCampaignAPI, updateCampaign as updateCampaignAPI, getCampaign,
    addTwitterRule as addTwitterRuleAPI, updateTwitterRule as updateTwitterRuleAPI, removeTwitterRule as removeTwitterRuleAPI } from "../net/Requests";
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
                        maxCampaigns: account.max_campaigns,
                        campaigns: account.campaigns.map(campaign => ({
                            name: campaign.name,
                            dateBegin: campaign.date_begin,
                            dateEnd: campaign.date_end,
                            config: {
                                delayFollowersUpdate: campaign.config.delay_followers_update,
                                maxTweetsFollow: campaign.config.max_tweets_follow,
                                messagesFollow: campaign.config.messages_follow,
                                undoFollow: campaign.config.undo_follow,
                                rules: campaign.config.rules
                            }
                        }))
                }))
            });
            return Promise.resolve();
        }).catch(error => {
            if (error.message === Status.DATA_CACHED)
            {
                return Promise.resolve();
            }
            else if (error.message === Status.UNAUTHORIZED)
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
                    accessTokenSecret: accessTokenSecret,
                    maxCampaigns: result.max_campaigns
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
			return Promise.reject(new Error(Status.INVALID_INPUTS));
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
                if (error.message === Status.NO_CHANGES)
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
            return Promise.reject(new Error(Status.INVALID_INPUTS));
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
        let names = [];
        for (let i = 0; i < state.accounts.data.length; i++)
        {
            names = names.concat(state.accounts.data[i].campaigns.map(campaign => campaign.name));
        }
        if (!isUniqueCampaignName(name, names))
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
                    dateEnd,
                    config: {}
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
            return Promise.reject(new Error(Status.INVALID_INPUTS));
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
        const accountIndex = findIndex(state.accounts.data, { name: accountId });
        const {
            uid,
            dateBegin: initialDateBegin,
            dateEnd: initialDateEnd
        } = state.accounts.data[accountIndex].campaigns[findIndex(state.accounts.data[accountIndex].campaigns, { name: campaignId })];
        const messages = [];
        let names = [];
        for (let i = 0; i < state.accounts.data.length; i++)
        {
            names = names.concat(state.accounts.data[i].campaigns.filter(campaign => campaign.uid !== uid).map(campaign => campaign.name));
        }
        if (!isValidCampaignName(name))
        {
            messages.push(CAMPAIGNFORM_NAME_INCORRECT);
        }
        if (!isUniqueCampaignName(name, names))
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
                if (error.message === Status.NO_CHANGES)
                {
                    return Promise.resolve();
                }
                else
                {
                    dispatch(sendFailureMessage(CAMPAIGNFORM_EDIT_ERROR));
                    return Promise.reject(error);
                }
            });
        }
        else
        {
            dispatch(sendFailureMessages(messages));
            return Promise.reject(new Error(Status.INVALID_INPUTS));
        }
    };
}

export function addTwitterRule(accountId, campaignId, name, type, track, condition, delay, undo, lang)
{
    return (dispatch, getState) => {
        const state = getState();
        const {
            GENERIC_ERROR,
            TWITTERRULE_NAME_INCORRECT,
            TWITTERRULE_NAME_NOT_UNIQUE,
            TWITTERRULE_ACTION_INCORRECT,
            TWITTERRULE_TRACK_INCORRECT,
            TWITTERRULE_KEYWORD_INCORRECT,
            TWITTERRULE_CONDITION_INCORRECT,
            TWITTERRULE_DELAY_INCORRECT,
            TWITTERRULE_UNDO_INCORRECT,
            TWITTERRULE_LANGUAGE_INCORRECT,
            TWITTERRULE_CREATE_SUCCESS,
            TWITTERRULE_CREATE_ERROR
        } = state.lang;
        const accountIndex = findIndex(state.accounts.data, { name: accountId });
        if (accountIndex !== -1)
        {
            const campaignIndex = findIndex(state.accounts.data[accountIndex].campaigns, { name: campaignId });
            if (campaignIndex !== -1)
            {
                const messages = [];
                if (!isValidTwitterRuleName(name))
                {
                    messages.push(TWITTERRULE_NAME_INCORRECT);
                }
                let names = state.accounts.data[accountIndex].campaigns[campaignIndex].config.rules.map(rule => rule.name);
                if (!isUniqueTwitterRuleName(name, names))
                {
                    messages.push(TWITTERRULE_NAME_NOT_UNIQUE);
                }
                if (!isValidTwitterRuleAction(type, Object.values(TwitterRuleTypes)))
                {
                    messages.push(TWITTERRULE_ACTION_INCORRECT);
                }
                if (Array.isArray(track))
                {
                    for (const keyword of track)
                    {
                        if (!isValidTwitterRuleKeyword(keyword))
                        {
                            messages.push(keyword + TWITTERRULE_KEYWORD_INCORRECT);
                        }
                    }
                }
                else
                {
                    messages.push(TWITTERRULE_TRACK_INCORRECT);
                }
                if (!isValidTwitterRuleCondition(condition, Object.values(TwitterRuleConditions)))
                {
                    messages.push(TWITTERRULE_CONDITION_INCORRECT);
                }
                if (!isValidTwitterRuleDelay(delay, 60, 300))
                {
                    messages.push(TWITTERRULE_DELAY_INCORRECT);
                }
                if (!isValidTwitterRuleUndo(undo, 0, 7))
                {
                    messages.push(TWITTERRULE_UNDO_INCORRECT);
                }
                if (!isValidTwitterRuleLanguages(lang, Object.values(TwitterRuleLangs)))
                {
                    messages.push(TWITTERRULE_LANGUAGE_INCORRECT);
                }
                if (messages.length === 0)
                {
                    const { token } = state.user;
                    return addTwitterRuleAPI(token, accountId, campaignId, name, type, track, condition, delay, undo, lang).then(result => {
                        dispatch({
                            type: ActionTypes.TWITTERRULE_ADD,
                            accountId: accountId,
                            campaignId: campaignId,
                            name: name,
                            action: type,
                            track: track,
                            condition: condition,
                            delay: delay,
                            undo: undo,
                            lang: lang
                        });
                        dispatch(sendSuccessMessage(TWITTERRULE_CREATE_SUCCESS));
                        return Promise.resolve();
                    }).catch(error => {
                        dispatch(sendFailureMessage(GENERIC_ERROR));
                        return Promise.reject(error);
                    });
                }
                else
                {
                    dispatch(sendFailureMessages(messages));
                    return Promise.reject(new Error(Status.INVALID_INPUTS));
                }
            }
            else
            {
                dispatch(sendFailureMessage(GENERIC_ERROR));
                return Promise.reject(new Error(Status.INVALID_INPUTS));
            }
        }
        else
        {
            dispatch(sendFailureMessage(GENERIC_ERROR));
            return Promise.reject(new Error(Status.INVALID_INPUTS));
        }
    };
}

export function updateTwitterRule(accountId, campaignId, ruleId, name, type, track, condition, delay, undo, lang)
{
    return (dispatch, getState) => {
        const state = getState();
        const {
            TWITTERRULE_NAME_INCORRECT,
            TWITTERRULE_NAME_NOT_UNIQUE,
            TWITTERRULE_ACTION_INCORRECT,
            TWITTERRULE_TRACK_INCORRECT,
            TWITTERRULE_KEYWORD_INCORRECT,
            TWITTERRULE_CONDITION_INCORRECT,
            TWITTERRULE_DELAY_INCORRECT,
            TWITTERRULE_UNDO_INCORRECT,
            TWITTERRULE_LANGUAGE_INCORRECT,
            TWITTERRULE_EDIT_SUCCESS,
            TWITTERRULE_EDIT_ERROR
        } = state.lang;
        const accountIndex = findIndex(state.accounts.data, { name: accountId });
        if (accountIndex !== -1)
        {
            const campaignIndex = findIndex(state.accounts.data[accountIndex].campaigns, { name: campaignId });
            if (campaignIndex !== -1)
            {
                const {
                    uid,
                    name: initialName,
                    type: initialType,
                    track: initialTrack,
                    condition: initialCondition,
                    delay: initialDelay,
                    undo: initialUndo,
                    lang: initialLang
                } = state.accounts.data[accountIndex].campaigns[campaignIndex].config.rules[findIndex(state.accounts.data[accountIndex].campaigns[campaignIndex].config.rules, { name: ruleId })];
                const messages = [];
                if (name != null && !isValidTwitterRuleName(name))
                {
                    messages.push(TWITTERRULE_NAME_INCORRECT);
                }
                let names = state.accounts.data[accountIndex].campaigns[campaignIndex].config.rules.map(rule => { if (uid !== rule.uid) return rule.name; });
                if (name != null && !isUniqueTwitterRuleName(name, names))
                {
                    messages.push(TWITTERRULE_NAME_NOT_UNIQUE);
                }
                if (type != null && !isValidTwitterRuleAction(type, Object.values(TwitterRuleTypes)))
                {
                    messages.push(TWITTERRULE_ACTION_INCORRECT);
                }
                if (track != null)
                {
                    if (Array.isArray(track))
                    {
                        for (const keyword of track)
                        {
                            if (!isValidTwitterRuleKeyword(keyword))
                            {
                                messages.push(keyword + TWITTERRULE_KEYWORD_INCORRECT);
                            }
                        }
                    }
                    else
                    {
                        messages.push(TWITTERRULE_TRACK_INCORRECT);
                    }
                }
                if (condition != null && !isValidTwitterRuleCondition(condition, Object.values(TwitterRuleConditions)))
                {
                    messages.push(TWITTERRULE_CONDITION_INCORRECT);
                }
                if (delay != null && !isValidTwitterRuleDelay(delay, 60, 300))
                {
                    messages.push(TWITTERRULE_DELAY_INCORRECT);
                }
                if (undo != null && !isValidTwitterRuleUndo(undo, 0, 7))
                {
                    messages.push(TWITTERRULE_UNDO_INCORRECT);
                }
                if (lang != null && !isValidTwitterRuleLanguages(lang, Object.values(TwitterRuleLangs)))
                {
                    messages.push(TWITTERRULE_LANGUAGE_INCORRECT);
                }
                if (messages.length === 0)
                {
                    const newName = name !== initialName ? name : null;
                    const newType = type !== initialType ? type : null;
                    const newTrack = track !== initialTrack ? track : null;
                    const newCondition = condition !== initialCondition ? condition : null;
                    const newDelay = delay !== initialDelay ? delay : null;
                    const newUndo = undo !== initialUndo ? undo : null;
                    const newLang = lang !== initialLang ? lang : null;
                    const { token } = state.user;
                    return updateTwitterRuleAPI(token, accountId, campaignId, ruleId, newName, newType, newTrack, newCondition, newDelay, newUndo, newLang).then(result => {
                        dispatch({
                            type: ActionTypes.TWITTERRULE_UPDATE,
                            accountId,
                            campaignId,
                            ruleId,
                            name,
                            action: type,
                            track,
                            condition,
                            delay,
                            undo,
                            lang
                        });
                        dispatch(sendSuccessMessage(TWITTERRULE_EDIT_SUCCESS));
                        return Promise.resolve();
                    }).catch(error => {
                        if (error.message === Status.NO_CHANGES)
                        {
                            return Promise.resolve();
                        }
                        else
                        {
                            dispatch(sendFailureMessage(TWITTERRULE_EDIT_ERROR));
                            return Promise.reject(error);
                        }
                    });
                }
                else
                {
                    dispatch(sendFailureMessages(messages));
                    return Promise.reject(new Error(Status.INVALID_INPUTS));
                }
            }
            else
            {
                dispatch(sendFailureMessage(TWITTERRULE_EDIT_ERROR));
                return Promise.reject(new Error(Status.INVALID_INPUTS));
            }
        }
        else
        {
            dispatch(sendFailureMessage(TWITTERRULE_EDIT_ERROR));
            return Promise.reject(new Error(Status.INVALID_INPUTS));
        }
    };
}

export function removeTwitterRule(accountId, campaignId, ruleId)
{
    return (dispatch, getState) => {
        const state = getState();
        const {
            TWITTERRULE_DELETE_ERROR,
            TWITTERRULE_DELETE_SUCCESS
        } = state.lang;
        const { token } = state.user;
        return removeTwitterRuleAPI(token, accountId, campaignId, ruleId).then(result => {
            dispatch({
                type: ActionTypes.TWITTERRULE_DELETE,
                accountId: accountId,
                campaignId: campaignId,
                ruleId: ruleId
            });
            dispatch(sendSuccessMessage(TWITTERRULE_DELETE_SUCCESS));
            return Promise.resolve();
        }).catch(error => {
            dispatch(sendFailureMessage(TWITTERRULE_DELETE_ERROR));
            return Promise.reject(error);
        });
    };
}