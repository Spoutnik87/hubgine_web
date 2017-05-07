import * as types from "../constants/ActionTypes";
import getLanguage from "../languages/lang"

const lang = (state = {}, action) =>
{
    switch (action.type)
    {
        case types.LANG_UPDATE:
            return getLanguage(action.lang);
        default:
            return state;
    }
}

export default lang;
