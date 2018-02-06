import { findIndex, isEqual } from "lodash";
import { isValidTwitterAccountName, isUniqueTwitterAccountName, isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret,
    isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret, isValidTwitterAccountBlacklistWord, isValidCampaignName, isUniqueCampaignName, isValidCampaignAccount, isValidCampaignDateBegin, isValidCampaignDateEnd,
    isValidTwitterRuleName, isUniqueTwitterRuleName, isValidTwitterRuleAction, isValidTwitterRuleMessage, isValidTwitterRuleCondition, isValidTwitterRuleKeyword, isValidTwitterRuleLanguages, isValidTwitterRuleDelay, isValidTwitterRuleUndo, 
    isValidCampaignForm, isValidTwitterAccountForm, isValidTwitterRuleForm } from "validator";
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

/**
 * Fetch account list and add this list to store.
 * @public
 * @returns {Promise<void>}
 */
const fetchAccountList = () => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const { token } = state.user;
    getAccountList(token, state.accounts).then(result => {
        dispatch({
            type: ActionTypes.ACCOUNT_UPDATE_LIST,
            accounts: result.accounts.map(account => ({
                    name: account.name,
                    consumerKey: account.consumer_key,
                    consumerSecret: account.consumer_secret,
                    accessTokenKey: account.access_token_key,
                    accessTokenSecret: account.access_token_secret,
                    maxCampaigns: account.max_campaigns,
                    blacklist: account.blacklist,
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
        resolve();
    }).catch(error => {
        if (error.message === Status.DATA_CACHED)
        {
            resolve();
        }
        else if (error.message === Status.UNAUTHORIZED)
        {
            const { SESSION_EXPIRED } = state.lang;
            dispatch(disconnect());
            dispatch(sendFailureMessage(SESSION_EXPIRED));
            reject(error);
        }
        else
        {
            reject(error);
        }
    });
});

/**
 * Add account to database and store.
 * @public
 * @param {string} name Account's name.
 * @param {string} consumerKey Account's consumer key.
 * @param {string} consumerSecret Account's consumer secret.
 * @param {string} accessTokenKey Account's access token key.
 * @param {string} accessTokenSecret Account's access token secret.
 * @param {Array<string>} blacklist Account's blacklist.
 * @returns {Promise<void>}
 */
const addAccount = (name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, blacklist) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        TWITTERACCOUNTFORM_NAME_INCORRECT,
        TWITTERACCOUNTFORM_NAME_NOT_UNIQUE,
        TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT,
        TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT,
        TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT,
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT,
        TWITTERACCOUNTFORM_BLACKLIST_WORD_INCORRECT,
        TWITTERACCOUNTFORM_BLACKLIST_INCORRECT,
        TWITTERACCOUNTFORM_GENERIC_ERROR,
        TWITTERACCOUNTFORM_CREATE_SUCCESS
    } = state.lang;
    let messages = [];
    const result = isValidTwitterAccountForm(name, state.accounts.data.map(account => account.name), consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, blacklist,
        TWITTERACCOUNTFORM_NAME_INCORRECT, TWITTERACCOUNTFORM_NAME_NOT_UNIQUE, TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT, TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT,
        TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT, TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT, TWITTERACCOUNTFORM_BLACKLIST_INCORRECT, TWITTERACCOUNTFORM_BLACKLIST_WORD_INCORRECT, true, false);
    if (Array.isArray(result))
    {
        messages = messages.concat(result);
    }
    if (messages.length === 0)
    {
        const { token } = state.user;
        addAccountAPI(token, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, blacklist).then(result => {
            dispatch({
                type: ActionTypes.ACCOUNT_ADD,
                name: name,
                consumerKey: consumerKey,
                consumerSecret: consumerSecret,
                accessTokenKey: accessTokenKey,
                accessTokenSecret: accessTokenSecret,
                maxCampaigns: result.max_campaigns,
                blacklist: blacklist
            });
            dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_CREATE_SUCCESS));
            resolve();
        }).catch(error => {
            dispatch(sendFailureMessage(TWITTERACCOUNTFORM_GENERIC_ERROR));
            reject(error);
        });
    }
    else
    {
        dispatch(sendFailureMessages(messages));
        reject(new Error(Status.INVALID_INPUTS));
    }
});

/**
 * Update account => send request to database and update store.
 * @public
 * @param {string} accountId Account's name.
 * @param {string} name Account's new name.
 * @param {string} consumerKey Account's new consumer key.
 * @param {string} consumerSecret Account's new consumer secret.
 * @param {string} accessTokenKey Account's new access token key.
 * @param {string} accessTokenSecret Account's new access token secret.
 * @param {Array<string>} blacklist Account's new blacklist.
 * @returns {Promise<void>}
 */
const updateAccount = (accountId, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, blacklist) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        TWITTERACCOUNTFORM_NAME_INCORRECT,
        TWITTERACCOUNTFORM_NAME_NOT_UNIQUE,
        TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT,
        TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT,
        TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT,
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT,
        TWITTERACCOUNTFORM_BLACKLIST_WORD_INCORRECT,
        TWITTERACCOUNTFORM_BLACKLIST_INCORRECT,
        TWITTERACCOUNTFORM_EDIT_SUCCESS,
        TWITTERACCOUNTFORM_EDIT_ERROR
    } = state.lang;
    const {
        uid,
        name: initialName,
        consumerKey: initialConsumerKey,
        consumerSecret: initialConsumerSecret,
        accessTokenKey: initialAccessTokenKey,
        accessTokenSecret: initialAccessTokenSecret,
        blacklist: initialBlacklist
    } = state.accounts.data[findIndex(state.accounts.data, { name: accountId })];
    const messages = [];

    if (name != null && !isValidTwitterAccountName(name))
    {
        messages.push(TWITTERACCOUNTFORM_NAME_INCORRECT);
    }
    if (name != null && !isUniqueTwitterAccountName(name, state.accounts.data.map(account => { if (uid !== account.uid) return account.name; })))
    {
        messages.push(TWITTERACCOUNTFORM_NAME_NOT_UNIQUE);
    }
    if (consumerKey != null && !isValidTwitterAccountConsumerKey(consumerKey))
    {
        messages.push(TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT);
    }
    if (consumerSecret != null && !isValidTwitterAccountConsumerSecret(consumerSecret))
    {
        messages.push(TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT);
    }
    if (accessTokenKey != null && !isValidTwitterAccountAccessTokenKey(accessTokenKey))
    {
        messages.push(TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT);
    }
    if (accessTokenSecret != null && !isValidTwitterAccountAccessTokenSecret(accessTokenSecret))
    {
        messages.push(TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT);
    }
    if (blacklist != null)
    {
        if (Array.isArray(blacklist))
        {
            for (const word of blacklist)
            {
                if (!isValidTwitterAccountBlacklistWord(word))
                {
                    messages.push(word + TWITTERACCOUNTFORM_BLACKLIST_WORD_INCORRECT);
                }
            }
        }
        else
        {
            messages.push(TWITTERACCOUNTFORM_BLACKLIST_INCORRECT);
        }
    }
    if (messages.length === 0)
    {
        const newName = name !== initialName ? name : null;
        const newConsumerKey = consumerKey !== initialConsumerKey ? consumerKey : null;
        const newConsumerSecret = consumerSecret !== initialConsumerSecret ? consumerSecret : null;
        const newAccessTokenKey = accessTokenKey !== initialAccessTokenKey ? accessTokenKey : null;
        const newAccessTokenSecret = accessTokenSecret !== initialAccessTokenSecret ? accessTokenSecret : null;
        const newBlacklist = blacklist !== initialBlacklist ? blacklist : null;
        const { token } = state.user;
        updateAccountAPI(token, initialName, newName, newConsumerKey, newConsumerSecret, newAccessTokenKey, newAccessTokenSecret, newBlacklist).then(result => {
            dispatch({
                type: ActionTypes.ACCOUNT_UPDATE,
                accountId: accountId,
                name: name,
                consumerKey: consumerKey,
                consumerSecret: consumerSecret,
                accessTokenKey: accessTokenKey,
                accessTokenSecret: accessTokenSecret,
                blacklist: blacklist
            });
            dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_EDIT_SUCCESS));
            resolve();
        }).catch(error => {
            if (error.message === Status.NO_CHANGES)
            {
                resolve();
            }
            else
            {
                dispatch(sendFailureMessage(TWITTERACCOUNTFORM_EDIT_ERROR));
                reject(error);
            }
        });
    }
    else
    {
        dispatch(sendFailureMessages(messages));
        reject(new Error(Status.INVALID_INPUTS));
    }
});

/**
 * Remove account from database and then remove it from store.
 * @public
 * @param {string} accountId Account's name.
 * @returns {Promise<void}
 */
const removeAccount = accountId => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const { token } = state.user;
    const {
        TWITTERACCOUNTFORM_DELETE_SUCCESS,
        TWITTERACCOUNTFORM_DELETE_ERROR
    } = state.lang;
    removeAccountAPI(token, accountId).then(result => {
        dispatch({
            type: ActionTypes.ACCOUNT_DELETE,
            accountId: accountId
        });
        dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_DELETE_SUCCESS));
        resolve();
    }).catch(error => {
        dispatch(sendSuccessMessage(TWITTERACCOUNTFORM_DELETE_ERROR));
        reject(error);
    });
});

//CAMPAIGNS
/**
 * @public
 * @param {string} accountId Campaign's account name.
 * @param {string} name Campaign's name.
 * @param {number} dateBegin Campaign's date begin unix format.
 * @param {number} dateEnd Campaign's date end unix format.
 * @returns {Promise<void>}
 */
const addCampaign = (accountId, name, dateBegin, dateEnd) => (dispatch, getState) => new Promise((resolve, reject) => {
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
    let messages = [];
    let names = [];
    for (const account of state.accounts.data)
    {
        for (const campaign of account.campaigns)
        {
            names.push(campaign.name);
        }
    }
    const result = isValidCampaignForm(name, names, dateBegin, dateEnd, CAMPAIGNFORM_NAME_INCORRECT, CAMPAIGNFORM_NAME_NOT_UNIQUE, 
        CAMPAIGNFORM_DATEBEGIN_INCORRECT, CAMPAIGNFORM_DATEEND_INCORRECT, CAMPAIGNFORM_DATES_INCORRECT, true, false);
    if (Array.isArray(result))
    {
        messages = messages.concat(result);
    }
    if (messages.length === 0)
    {
        const { token } = state.user;
        addCampaignAPI(token, accountId, name, dateBegin, dateEnd).then(result => {
            dispatch({
                type: ActionTypes.CAMPAIGN_ADD,
                accountId,
                name,
                dateBegin,
                dateEnd,
                config: {
                    rules: []
                }
            });
            dispatch(sendSuccessMessage(CAMPAIGNFORM_CREATE_SUCCESS));
            resolve();
        }).catch(error => {
            dispatch(sendFailureMessage(CAMPAIGNFORM_GENERIC_ERROR));
            reject(error);
        });
    }
    else
    {
        dispatch(sendFailureMessages(messages));
        reject(new Error(Status.INVALID_INPUTS));
    }
});

/**
 * Update campaign in database and store.
 * @public
 * @param {string} accountId Campaign's account name.
 * @param {string} campaignId Campaign's name.
 * @param {string} name Campaign's new name.
 * @param {number} dateBegin Campaign's new date begin unix format.
 * @param {number} dateEnd Campaign's new date end unix format.
 * @returns {Promise<void>}
 */
const updateCampaign = (accountId, campaignId, name, dateBegin, dateEnd) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        CAMPAIGNFORM_NAME_INCORRECT,
        CAMPAIGNFORM_NAME_NOT_UNIQUE,
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
    if (name != null && !isValidCampaignName(name))
    {
        messages.push(CAMPAIGNFORM_NAME_INCORRECT);
    }
    if (name != null && !isUniqueCampaignName(name, names))
    {
        messages.push(CAMPAIGNFORM_NAME_NOT_UNIQUE);
    }
    if (dateBegin != null && !isValidCampaignDateBegin(dateBegin))
    {
        messages.push(CAMPAIGNFORM_DATEBEGIN_INCORRECT);
    }
    if (dateEnd != null && !isValidCampaignDateEnd(dateEnd))
    {
        messages.push(CAMPAIGNFORM_DATEEND_INCORRECT);
    }
    if ((dateBegin != null ? dateBegin : initialDateBegin) >= (dateEnd != null ? dateEnd : initialDateEnd))
    {
        messages.push(CAMPAIGNFORM_DATES_INCORRECT);
    }
    if (messages.length === 0)
    {
        const newName = name !== campaignId ? name : null;
        const newDateBegin = dateBegin !== initialDateBegin ? dateBegin : null;
        const newDateEnd = dateEnd !== initialDateEnd ? dateEnd : null;
        const { token } = state.user;
        updateCampaignAPI(token, accountId, campaignId, newName, newDateBegin, newDateEnd).then(result => {
            dispatch({
                type: ActionTypes.CAMPAIGN_UPDATE,
                accountId,
                campaignId,
                name,
                dateBegin,
                dateEnd
            });
            dispatch(sendSuccessMessage(CAMPAIGNFORM_EDIT_SUCCESS));
            resolve();
        }).catch(error => {
            if (error.message === Status.NO_CHANGES)
            {
                resolve();
            }
            else
            {
                dispatch(sendFailureMessage(CAMPAIGNFORM_EDIT_ERROR));
                reject(error);
            }
        });
    }
    else
    {
        dispatch(sendFailureMessages(messages));
        reject(new Error(Status.INVALID_INPUTS));
    }
});

/**
 * Remove campaign from database, then remove it from store.
 * @public
 * @param {string} accountId Campaign's account name.
 * @param {stirng} campaignId Campaign's name.
 * @returns {Promise<void>}
 */
const removeCampaign = (accountId, campaignId) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        CAMPAIGNFORM_DELETE_SUCCESS,
        CAMPAIGNFORM_DELETE_ERROR
    } = state.lang;
    const { token } = state.user;
    removeCampaignAPI(token, accountId, campaignId).then(result => {
        dispatch({
            type: ActionTypes.CAMPAIGN_DELETE,
            accountId,
            campaignId
        });
        dispatch(sendSuccessMessage(CAMPAIGNFORM_DELETE_SUCCESS));
        resolve();
    }).catch(error => {
        dispatch(sendFailureMessage(CAMPAIGNFORM_DELETE_ERROR))
        reject(error);
    });
});

/**
 * Add a rule to database and store.
 * @public
 * @param {string} accountId Rule's account name.
 * @param {string} campaignId Rule's campaign name.
 * @param {string} name Rule's name.
 * @param {TwitterRuleTypes} type Rule's type.
 * @param {Object<string, Array<string>>} tweetMessages Rule's messages.
 * @param {Array<string>} track Rule's keyword list.
 * @param {TwitterRuleConditions} condition Rule's condition.
 * @param {number} delay Rule's delay.
 * @param {number} undo Rule's undo.
 * @param {Array<TwitterRuleLangs>} lang Rule's languages.
 * @returns {Promise<void>}
 */
const addTwitterRule = (accountId, campaignId, name, type, tweetMessages, track, condition, delay, undo, lang) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        GENERIC_ERROR,
        TWITTERRULE_NAME_INCORRECT,
        TWITTERRULE_NAME_NOT_UNIQUE,
        TWITTERRULE_ACTION_INCORRECT,
        TWITTERRULE_MESSAGE_INCORRECT,
        TWITTERRULE_MESSAGES_INCORRECT,
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
            let messages = [];
            const names = state.accounts.data[accountIndex].campaigns[campaignIndex].config.rules.map(rule => rule.name);
            const result = isValidTwitterRuleForm(name, names, type, Object.values(TwitterRuleTypes), tweetMessages, 10, condition, Object.values(TwitterRuleConditions), track, 10, undo, 0, 7, lang, Object.values(TwitterRuleLangs), 10, delay, 60, 300,
                TWITTERRULE_NAME_INCORRECT, TWITTERRULE_NAME_NOT_UNIQUE, TWITTERRULE_ACTION_INCORRECT, TWITTERRULE_MESSAGES_INCORRECT, TWITTERRULE_MESSAGE_INCORRECT, TWITTERRULE_CONDITION_INCORRECT, TWITTERRULE_TRACK_INCORRECT, 
                TWITTERRULE_KEYWORD_INCORRECT, TWITTERRULE_UNDO_INCORRECT, TWITTERRULE_LANGUAGE_INCORRECT, TWITTERRULE_DELAY_INCORRECT, true, false);
            if (Array.isArray(result))
            {
                messages = messages.concat(result);
            }
            if (messages.length === 0)
            {
                const { token } = state.user;
                addTwitterRuleAPI(token, accountId, campaignId, name, type, tweetMessages, track, condition, delay, undo, lang).then(result => {
                    const rule = {
                        accountId: accountId,
                        campaignId: campaignId,
                        name: name,
                        action: type,
                        track: track,
                        condition: condition,
                        delay: delay,
                        undo: undo,
                        lang: lang
                    };
                    if (tweetMessages != null)
                    {
                        rule.messages = tweetMessages;
                    }
                    dispatch({
                        ...rule,
                        type: ActionTypes.TWITTERRULE_ADD
                    });
                    dispatch(sendSuccessMessage(TWITTERRULE_CREATE_SUCCESS));
                    resolve();
                }).catch(error => {
                    dispatch(sendFailureMessage(GENERIC_ERROR));
                    reject(error);
                });
            }
            else
            {
                dispatch(sendFailureMessages(messages));
                reject(new Error(Status.INVALID_INPUTS));
            }
        }
        else
        {
            dispatch(sendFailureMessage(GENERIC_ERROR));
            reject(new Error(Status.INVALID_INPUTS));
        }
    }
    else
    {
        dispatch(sendFailureMessage(GENERIC_ERROR));
        reject(new Error(Status.INVALID_INPUTS));
    }
});

/**
 * Update rule in database and store.
 * @public
 * @param {string} accountId Rule's account name.
 * @param {string} campaignId Rule's campaign name.
 * @param {string} ruleId Rule's name.
 * @param {string} name Rule's new name.
 * @param {TwitterRuleTypes} type Rule's new type.
 * @param {Object<string, Array<string>>} tweetMessages Rule's new tweet messages.
 * @param {Array<string>} track Rule's new track.
 * @param {TwitterRuleConditions} condition Rule's new condition.
 * @param {number} delay Rule's new delay.
 * @param {number} undo Relay's new undo.
 * @param {Array<TwitterRuleLangs>} lang Rule's new languages.
 * @returns {Promise<void>}
 */
const updateTwitterRule = (accountId, campaignId, ruleId, name, type, tweetMessages, track, condition, delay, undo, lang) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        TWITTERRULE_NAME_INCORRECT,
        TWITTERRULE_NAME_NOT_UNIQUE,
        TWITTERRULE_ACTION_INCORRECT,
        TWITTERRULE_MESSAGE_INCORRECT,
        TWITTERRULE_MESSAGES_INCORRECT,
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
                messages: initialMessages,
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
            if (type === TwitterRuleTypes.TWEET && tweetMessages != null)
            {
                if (Array.isArray(tweetMessages))
                {
                    for (const message of tweetMessages)
                    {
                        if (!isValidTwitterRuleMessage(message))
                        {
                            messages.push(message + TWITTERRULE_MESSAGE_INCORRECT);
                        }
                    }
                }
                else
                {
                    messages.push(TWITTERRULE_MESSAGES_INCORRECT);
                }
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
                const newMessages = !isEqual(tweetMessages, initialMessages) ? tweetMessages : null;
                const newTrack = !isEqual(track, initialTrack) ? track : null;
                const newCondition = condition !== initialCondition ? condition : null;
                const newDelay = delay !== initialDelay ? delay : null;
                const newUndo = undo !== initialUndo ? undo : null;
                const newLang = !isEqual(lang, initialLang) ? lang : null;
                const { token } = state.user;
                updateTwitterRuleAPI(token, accountId, campaignId, ruleId, newName, newType, newMessages, newTrack, newCondition, newDelay, newUndo, newLang).then(result => {
                    dispatch({
                        type: ActionTypes.TWITTERRULE_UPDATE,
                        accountId,
                        campaignId,
                        ruleId,
                        name,
                        action: type,
                        messages: tweetMessages,
                        track,
                        condition,
                        delay,
                        undo,
                        lang
                    });
                    dispatch(sendSuccessMessage(TWITTERRULE_EDIT_SUCCESS));
                    resolve();
                }).catch(error => {
                    if (error.message === Status.NO_CHANGES)
                    {
                        resolve();
                    }
                    else
                    {
                        dispatch(sendFailureMessage(TWITTERRULE_EDIT_ERROR));
                        reject(error);
                    }
                });
            }
            else
            {
                dispatch(sendFailureMessages(messages));
                reject(new Error(Status.INVALID_INPUTS));
            }
        }
        else
        {
            dispatch(sendFailureMessage(TWITTERRULE_EDIT_ERROR));
            reject(new Error(Status.INVALID_INPUTS));
        }
    }
    else
    {
        dispatch(sendFailureMessage(TWITTERRULE_EDIT_ERROR));
        reject(new Error(Status.INVALID_INPUTS));
    }
});

/**
 * Remove rule from database and store.
 * @public
 * @param {string} accountId Rule's account name.
 * @param {string} campaignId Rule's campaign name.
 * @param {string} ruleId Rule's name.
 * @returns {Promise<void>}
 */
const removeTwitterRule = (accountId, campaignId, ruleId) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        TWITTERRULE_DELETE_ERROR,
        TWITTERRULE_DELETE_SUCCESS
    } = state.lang;
    const { token } = state.user;
    removeTwitterRuleAPI(token, accountId, campaignId, ruleId).then(result => {
        dispatch({
            type: ActionTypes.TWITTERRULE_DELETE,
            accountId: accountId,
            campaignId: campaignId,
            ruleId: ruleId
        });
        dispatch(sendSuccessMessage(TWITTERRULE_DELETE_SUCCESS));
        resolve();
    }).catch(error => {
        dispatch(sendFailureMessage(TWITTERRULE_DELETE_ERROR));
        reject(error);
    });
});

export {
    fetchAccountList,
    addAccount,
    updateAccount,
    removeAccount,
    addCampaign,
    updateCampaign,
    removeCampaign,
    addTwitterRule,
    updateTwitterRule,
    removeTwitterRule
};