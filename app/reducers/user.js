import * as ActionTypes from "../constants/ActionTypes";

const user = (state = {}, action) =>
{
    switch (action.type)
    {
        case ActionTypes.USER_CONNECT:
            return {
                token: action.token,
                email: action.email,
                rank: action.rank,
                lang: action.lang
            };
        case ActionTypes.USER_UPDATE_INFOS:
            return {
                ...state,
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname
            };
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
        case ActionTypes.USER_DISCONNECT:
            return {};
        default:
            return state;
    }
}

export default user;
