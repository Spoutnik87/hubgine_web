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

export function removeAccount(account_id)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_DELETE,
            account_id: account_id
        });
    };
}

export function updateAccountName(account_id, name)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_NAME,
            account_id: account_id,
            name: name
        });
    };
}

export function updateAccountConsumerKey(account_id, consumer_key)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_CONSUMER_KEY,
            account_id: account_id,
            consumer_key: consumer_key
        });
    };
}

export function updateAccountConsumerSecret(account_id, consumer_secret)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_CONSUMER_SECRET,
            account_id: account_id,
            consumer_secret: consumer_secret
        });
    };
}

export function updateAccountAccessToken(account_id, access_token)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN,
            account_id: account_id,
            access_token: access_token
        });
    };
}

export function updateAccountAccessTokenKey(account_id, access_token_secret)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN_SECRET,
            account_id: account_id,
            access_token_secret: access_token_secret
        });
    };
}