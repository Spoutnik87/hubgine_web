import * as ActionTypes from "../constants/ActionTypes";
import v4 from "uuid";

const accounts = (state = [], action) =>
{
    switch (action.type)
    {
        case ActionTypes.ACCOUNT_UPDATE_LIST:
            return action.accounts.map(account => {
                account.uid = v4();
                return account;
            });
        case ActionTypes.ACCOUNT_ADD:
            action.account.uid = v4();
            return [ ...state, action.account ];
        case ActionTypes.ACCOUNT_DELETE:
            return state.filter(account => {
                return account.name !== action.account_id ? true : false;
            });
        case ActionTypes.ACCOUNT_UPDATE_NAME:
            state[action.account_id].name = action.name;
            return state;
        case ActionTypes.ACCOUNT_UPDATE_CONSUMER_KEY:
            state[action.account_id].consumer_key = action.consumer_key;
            return state;
        case ActionTypes.ACCOUNT_UPDATE_CONSUMER_SECRET:
            state[action.account_id].consumer_key = action.consumer_secret;
            return state;
        case ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN:
            state[action.account_id].consumer_key = action.access_token;
            return state;
        case ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN_SECRET:
            state[action.account_id].consumer_key = action.access_token_key;
            return state;
        default:
            return state;
    }
}

export default accounts;