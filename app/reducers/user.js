import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const user = (state = {}, action) =>
{
    switch (action.type)
    {
        case types.USER_CONNECT:
            return {
                token: action.token,
                email: action.email,
                rank: action.rank
            };
        case types.USER_DISCONNECT:
            return {};
        default:
            return state;
    }
}

export default user;
