import * as types from '../constants/ActionTypes';

export function changeLanguage(lang)
{
    return (dispatch) => {
        return dispatch({
            type: types.USER_UPDATE_LANG,
            lang: lang
        });
    };
}