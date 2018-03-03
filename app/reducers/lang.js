import * as ActionTypes from "../constants/ActionTypes";
import getLanguage from "../languages/lang";

/**
 * Lang reducer.
 * @param {Object<any,any>} state Language store state.
 * @param {string} action ActionType.
 */

const lang = (state = {}, action) => {
    switch (action.type)
    {
        case ActionTypes.LANG_UPDATE:
            return getLanguage(action.lang);
        default:
            return state;
    }
};

export default lang;
