import * as types from '../constants/ActionTypes';

export function updateAccountList(accounts)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.ACCOUNT_UPDATE_LIST,
            accounts: accounts
        });
    };
}

export function updateAccount(account_id)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.UPDATE_ACCOUNT,
            account: account_id
        });
    };
}