import * as ActionTypes from "../constants/ActionTypes";
import * as RequestTypes from "../constants/RequestTypes";
import { addMetadata } from "../util/Metadata";

const user = (state = {}, action) =>
{
    switch (action.type)
    {
        case ActionTypes.USER_SET:
            return addMetadata({
                ...state,
                token: action.token,
                email: action.email,
                rank: action.rank,
                lang: action.lang
            }, RequestTypes.USER_BASIC);
        case ActionTypes.USER_UPDATE:
            const newState = {};
            if (action.email) newState.email = action.email;
            if (action.firstname) newState.firstname = action.firstname;
            if (action.lastname) newState.lastname = action.lastname;
            if (action.lang) newState.lang = action.lang;
            return {
                ...state,
                ...newState
            };
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
        case ActionTypes.USER_UNSET:
            return {};
        default:
            return state;
    }
}

export default user;
