import * as ActionTypes from "../constants/ActionTypes";

export function changeLanguage(lang)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.LANG_UPDATE,
            lang: lang
        });
    };
}