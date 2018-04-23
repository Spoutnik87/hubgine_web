import { USER_SET, USER_UPDATE, USER_UPDATE_INFOS, USER_UNSET } from "../constants/ActionType";
import * as RequestType from "../constants/RequestType";
import { addMetadata } from "../util/Metadata";

/**
 * User reducer.
 * @public
 * @param {Object<any,any>} state Object state.
 * @param {string} action ActionType
 */
const user = (state = {}, action) => {
    switch (action.type)
    {
        case USER_SET:
            return addMetadata({
                ...state,
                token: action.token,
                email: action.email,
                rank: action.rank,
                lang: action.lang
            }, RequestType.USER_BASIC);
        case USER_UPDATE:
            const newState = {};
            if (action.email) newState.email = action.email;
            if (action.firstname) newState.firstname = action.firstname;
            if (action.lastname) newState.lastname = action.lastname;
            if (action.lang) newState.lang = action.lang;
            return {
                ...state,
                ...newState
            };
        case USER_UPDATE_INFOS:
            return addMetadata({
                ...state,
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname,
                maxAccounts: action.maxAccounts
            }, RequestType.USER_FULL);
        case USER_UNSET:
            return {};
        default:
            return state;
    }
};

export default user;