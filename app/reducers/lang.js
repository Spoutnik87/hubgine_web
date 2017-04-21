import * as types from '../constants/ActionTypes';

const lang = (state = {}, action) =>
{
    switch (action.type)
    {
        case types.USER_UPDATE_LANG:
            return {};
        default:
            return state;
    }
}

export default lang;
