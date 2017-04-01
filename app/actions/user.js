import * as types from '../constants/ActionTypes';

export function connect(token, rank)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.USER_CONNECT,
            token: token,
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