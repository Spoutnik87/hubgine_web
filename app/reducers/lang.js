import * as types from '../constants/ActionTypes';
import getLanguage from './../languages/lang'

const lang = (state = {}, action) =>
{
    switch (action.type)
    {
        case types.USER_UPDATE_LANG:
            return getLanguage(action.lang);
        default:
            return state;
    }
}

export default lang;
