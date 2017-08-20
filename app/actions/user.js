import * as ActionTypes from "../constants/ActionTypes";

export function connect(token, email, rank, lang)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.USER_CONNECT,
            token: token,
            email: email,
            rank: rank,
            lang: lang
        });
    };
}

export function disconnect()
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.USER_DISCONNECT
        });
    };
}

export function updateInfos(email, firstname, lastname)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.USER_UPDATE_INFOS,
            email: email,
            firstname: firstname,
            lastname: lastname
        });
    };
}

export function updateEmail(email)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.USER_UPDATE_EMAIL,
            email: email
        });
    };
}

export function updateFirstname(firstname)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.USER_UPDATE_FIRSTNAME,
            firstname: firstname
        });
    };
}

export function updateLastname(lastname)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.USER_UPDATE_LASTNAME,
            lastname: lastname
        });
    };
}

export function updateLanguage(lang)
{
    return (dispatch) => {
        return dispatch({
            type: ActionTypes.USER_UPDATE_LANGUAGE,
            lang: lang
        });
    };
}