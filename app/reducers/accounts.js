import * as types from '../constants/ActionTypes';

const accounts = (state = {}, action) =>
{
    switch (action.type)
    {
        case types.ACCOUNT_UPDATE_LIST:
            return {
                length: action.length,
                list: action.accounts
            };
        case types.ACCOUNT_UPDATE_NAME:
            state.list[action.account_id].name = action.name;
            return state;
        case types.ACCOUNT_UPDATE_CONSUMER_KEY:
            state.list[action.account_id].consumer_key = action.consumer_key;
            return state;
        case types.ACCOUNT_UPDATE_CONSUMER_SECRET:
            state.list[action.account_id].consumer_key = action.consumer_secret;
            return state;
        case types.ACCOUNT_UPDATE_ACCESS_TOKEN:
            state.list[action.account_id].consumer_key = action.access_token;
            return state;
        case types.ACCOUNT_UPDATE_ACCESS_TOKEN_SECRET:
            state.list[action.account_id].consumer_key = action.access_token_key;
            return state;
        default:
            return state;
    }
}

export default accounts;