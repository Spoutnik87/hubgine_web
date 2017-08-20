import * as ActionTypes from "../constants/ActionTypes";

export function updateAccountList(accounts)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_LIST,
            accounts: accounts
        });
    };
}

export function addAccount(account)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_ADD,
            account: account
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

export function updateAccountConsumerKey(accountId, consumer_key)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_CONSUMER_KEY,
            accountId: accountId,
            consumer_key: consumer_key
        });
    };
}

export function updateAccountConsumerSecret(accountId, consumer_secret)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_CONSUMER_SECRET,
            accountId: accountId,
            consumer_secret: consumer_secret
        });
    };
}

export function updateAccountAccessToken(accountId, access_token)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN,
            accountId: accountId,
            access_token: access_token
        });
    };
}

export function updateAccountAccessTokenKey(accountId, access_token_secret)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN_SECRET,
            accountId: accountId,
            access_token_secret: access_token_secret
        });
    };
}