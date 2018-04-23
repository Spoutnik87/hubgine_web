import moment from "moment";
import * as ActionType from "../constants/ActionType";
import * as Language from "../constants/Language";

/**
 * Load language in store.
 * @public
 * @param {Language} lang Language.
 * @returns {void}
 */
const changeLanguage = lang => dispatch => {
    moment.locale(lang);
    return dispatch({
        type: ActionType.LANG_UPDATE,
        lang: lang
    });
}

export {
    changeLanguage
};