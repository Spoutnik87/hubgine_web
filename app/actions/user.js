import * as types from '../constants/ActionTypes';

export function connect(token, email, rank)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.USER_CONNECT,
            token: token,
            email: email,
            rank: rank
        });
    };
}

export function disconnect()
{
    return (dispatch) => {
        return dispatch({
            type: types.USER_DISCONNECT
        });
    };
}

export function updateInfos(email, firstname, lastname)
{
    return (dispatch) => {
        return dispatch({
            type: types.USER_UPDATE_INFOS,
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
            type: types.USER_UPDATE_EMAIL,
            email: email
        });
    };
}