import * as ActionTypes from "../constants/ActionTypes";
import * as RequestTypes from "../constants/RequestTypes";
import { addMetadata } from "../util/Metadata";

const user = (state = {}, action) =>
{
    switch (action.type)
    {
        case ActionTypes.USER_CONNECT:
            return addMetadata({
                ...state,
                token: action.token,
                email: action.email,
                rank: action.rank,
                lang: action.lang
            }, RequestTypes.USER_BASIC);
        case ActionTypes.USER_UPDATE_INFOS:
            return addMetadata({
                ...state,
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname
            }, RequestTypes.USER_NAME);
        case ActionTypes.USER_UPDATE_MAX_ACCOUNTS:
            return addMetadata({
                ...state,
                maxAccounts: action.maxAccounts
            }, RequestTypes.USER_MAX_ACCOUNTS);
        case ActionTypes.USER_UPDATE_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case ActionTypes.USER_UPDATE_FIRSTNAME:
            return {
                ...state,
                firstname: action.firstname
            };
        case ActionTypes.USER_UPDATE_LASTNAME:
            return {
                ...state,
                lastname: action.lastname
            };
        case ActionTypes.USER_UPDATE_LANGUAGE:
            return {
                ...state,
                lang: action.lang
            };
        case ActionTypes.USER_DISCONNECT:
            return {};
        default:
            return state;
    }
}

export default user;
