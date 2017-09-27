import { findIndex } from "lodash";
import { isValidTwitterAccountName, isUniqueTwitterAccountName, isValidTwitterAccountConsumerKey, isValidTwitterAccountConsumerSecret,
    isValidTwitterAccountAccessTokenKey, isValidTwitterAccountAccessTokenSecret } from "validator";
import * as ActionTypes from "../constants/ActionTypes";
import * as Errors from "../constants/ErrorTypes";
import { getAccountList, updateAccount as updateAccountAPI, addAccount as addAccountAPI, getTwitterAccountKeys, removeAccount as removeAccountAPI } from "../net/Requests";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage } from "./messages";

export function fetchAccountList()
{
    return (dispatch, getState) => {
        const state = getState();
        const { email, token } = state.user;
        return getAccountList(email, token, state.accounts).then(result => {
            dispatch({
                type: ActionTypes.ACCOUNT_UPDATE_LIST,
                accounts: result.accounts.map(account => {
                    let newAccount = {
                        name: account.name
                    };
                    if (account.consumer_key) newAccount.consumerKey = account.consumer_key;
                    if (account.consumer_secret) newAccount.consumerSecret = account.consumer_secret;
                    if (account.access_token_key) newAccount.accessTokenKey = account.access_token_key;
                    if (account.access_token_secret) newAccount.accessTokenSecret = account.access_token_secret;
                    return newAccount;
                })
            });
            return Promise.resolve();
        }).catch(error => {
            if (error.message === Errors.ERROR_DATA_CACHED)
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
            const { email, token } = state.user;
            return addAccountAPI(email, token, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret).then(result => {
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
            const { email, token } = state.user;
            return updateAccountAPI(email, token, initialName, newName, newConsumerKey, newConsumerSecret, newAccessTokenKey, newAccessTokenSecret).then(result => {
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

export function fetchAccountKeys(accountId)
{
    return (dispatch, getState) => {
        const state = getState();
        const { email, token } = state.user;

        return getTwitterAccountKeys(email, token, accountId, state.accounts.data[findIndex(state.accounts.data, { name: accountId })]).then(result => {
            dispatch({
                type: ActionTypes.ACCOUNT_UPDATE_KEYS,
                accountId: accountId,
                consumerKey: result.consumer_key,
                consumerSecret: result.consumer_secret,
                accessTokenKey: result.access_token_key,
                accessTokenSecret: result.access_token_secret
            });
            return Promise.resolve();
        }).catch(error => {
            if (error.message === Errors.ERROR_DATA_CACHED)
            {
                Promise.resolve();
            }
            else
            {
                Promise.reject(error);
            }
        });
    };
}

export function removeAccount(accountId)
{
    return (dispatch, getState) => {
        const state = getState();
        const { email, token } = state.user;
        const {
            TWITTERACCOUNTFORM_DELETE_SUCCESS,
            TWITTERACCOUNTFORM_DELETE_ERROR
        } = state.lang;
        return removeAccountAPI(email, token, accountId).then(result => {
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