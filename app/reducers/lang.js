import * as types from '../constants/ActionTypes';
import languages from './../languages/lang'

const lang = (state = {}, action) =>
{
    switch (action.type)
    {
        case types.USER_UPDATE_LANG:
            return languages.default(action.lang);
        default:
            return state;
    }
}

export default lang;
