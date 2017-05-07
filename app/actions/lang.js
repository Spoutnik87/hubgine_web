import * as types from "../constants/ActionTypes";

export function changeLanguage(lang)
{
    return (dispatch) => {
        return dispatch({
            type: types.LANG_UPDATE,
            lang: lang
        });
    };
}