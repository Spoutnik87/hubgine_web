import * as ActionTypes from "../constants/ActionTypes";
import * as Languages from "../constants/Languages";

/**
 * Load language in store.
 * @public
 * @param {Languages} lang Language.
 * @returns {void}
 */
const changeLanguage = lang => dispatch => {
    return dispatch({
        type: ActionTypes.LANG_UPDATE,
        lang: lang
    });
}

export {
    changeLanguage
};