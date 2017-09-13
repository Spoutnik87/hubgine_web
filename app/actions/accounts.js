import * as ActionTypes from "../constants/ActionTypes";

export function updateAccountList(accounts)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_LIST,
            accounts: accounts.map(account => {
                let newAccount = {
                    name: account.name
                };
                if (account.consumerKey) newAccount.consumerKey = account.consumerKey;
                if (account.consumerSecret) newAccount.consumerSecret = account.consumerSecret;
                if (account.accessTokenKey) newAccount.accessTokenKey = account.accessTokenKey;
                if (account.accessTokenSecret) newAccount.accessTokenSecret = account.accessTokenSecret;
                return newAccount;
            })
        });
    };
}

export function addAccount(name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_ADD,
            name: name,
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            accessTokenKey: accessTokenKey,
            accessTokenSecret: accessTokenSecret
        });
    };
}

export function removeAccount(accountId)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_DELETE,
            accountId: accountId
        });
    };
}

export function updateAccount(accountId, name, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.ACCOUNT_UPDATE,
            accountId: accountId,
            name: name,
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            accessTokenKey: accessTokenKey,
            accessTokenSecret: accessTokenSecret
        });
    };
}

export function updateAccountName(accountId, name)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_NAME,
            accountId: accountId,
            name: name
        });
    };
}

export function updateAccountKeys(accountId, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.ACCOUNT_UPDATE_KEYS,
            accountId: accountId,
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            accessTokenKey: accessTokenKey,
            accessTokenSecret: accessTokenSecret
        });
    };
}

export function updateAccountConsumerKey(accountId, consumerKey)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_CONSUMER_KEY,
            accountId: accountId,
            consumerKey: consumerKey
        });
    };
}

export function updateAccountConsumerSecret(accountId, consumerSecret)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_CONSUMER_SECRET,
            accountId: accountId,
            consumerSecret: consumerSecret
        });
    };
}

export function updateAccountAccessToken(accountId, accessTokenKey)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN_KEY,
            accountId: accountId,
            accessTokenKey: accessTokenKey
        });
    };
}

export function updateAccountAccessTokenKey(accountId, access_token_secret)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN_SECRET,
            accountId: accountId,
            accessTokenSecret: accessTokenSecret
        });
    };
}