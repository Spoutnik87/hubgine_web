import v4 from "uuid";
import { findIndex } from "lodash";
import * as ActionTypes from "../constants/ActionTypes";
import * as RequestTypes from "../constants/RequestTypes";
import { addMetadata } from "../util/Metadata";

const accounts = (state = {}, action) =>
{
    let id = 0;
    switch (action.type)
    {
        case ActionTypes.ACCOUNT_UPDATE_LIST:
            addMetadata(state, RequestTypes.ACCOUNT_LIST_NAME);
            return {
                ...state,
                data: action.accounts.map(account => {
                    account.uid = v4();
                    if (account.consumerKey && account.consumerSecret && account.accessTokenKey && account.accessTokenSecret)
                    {
                        account = addMetadata(account, RequestTypes.ACCOUNT_KEYS);
                    }
                    return addMetadata(account, RequestTypes.ACCOUNT_NAME);
                })
        };
        case ActionTypes.ACCOUNT_ADD:
            let account = addMetadata(action.account, RequestTypes.ACCOUNT_NAME);
            if (consumerKey && consumerSecret && accessTokenKey && accessTokenSecret)
            {
                account = addMetadata(account, RequestTypes.ACCOUNT_KEYS);
            }
            state.data.push({
                ...account,
                uid: v4()
            });
            return state;
        case ActionTypes.ACCOUNT_DELETE:
            state.data = state.data.filter(account => {
                return account.name !== action.accountId ? true : false;
            });
            return state;
        case ActionTypes.ACCOUNT_UPDATE:
            id = findIndex(state.data, { name: action.accountId });
            state.data[id] = addMetadata(addMetadata({
                ...state.data[id],
                name: action.name,
                consumerKey: action.consumerKey,
                consumerSecret: action.consumerSecret,
                accessTokenKey: action.accessTokenKey,
                accessTokenSecret: action.accessTokenSecret
            }, RequestTypes.ACCOUNT_NAME), RequestTypes.ACCOUNT_KEYS);
            return state;
        case ActionTypes.ACCOUNT_UPDATE_KEYS:
            id = findIndex(state.data, {
                name: action.accountId
            });
            state.data[id] = addMetadata({
                ...state.data[id],
                consumerKey: action.consumerKey,
                consumerSecret: action.consumerSecret,
                accessTokenKey: action.accessTokenKey,
                accessTokenSecret: action.accessTokenSecret
            }, RequestTypes.ACCOUNT_KEYS);
            return state;
        case ActionTypes.ACCOUNT_UPDATE_NAME:
            state.data[findIndex(state.data, { name: action.accountId })].name = action.name;
            return state;
        case ActionTypes.ACCOUNT_UPDATE_CONSUMER_KEY:
            state.data[findIndex(state.data, { name: action.accountId })].consumerKey = action.consumerKey;
            return state;
        case ActionTypes.ACCOUNT_UPDATE_CONSUMER_SECRET:
            state.data[findIndex(state.data, { name: action.accountId })].consumerSecret = action.consumerSecret;
            return state;
        case ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN_KEY:
            state.data[findIndex(state.data, { name: action.accountId })].accessTokenKey = action.accessTokenKey;
            return state;
        case ActionTypes.ACCOUNT_UPDATE_ACCESS_TOKEN_SECRET:
            state.data[findIndex(state.data, { name: action.accountId })].accessTokenSecret = action.accessTokenSecret;
            return state;
        default:
            return state;
    }
}

export default accounts;