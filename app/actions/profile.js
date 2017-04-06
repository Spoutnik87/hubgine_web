import * as types from '../constants/ActionTypes';

export function sendFailureMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.EDIT_PROFILE_FAILURE,
            messages: messages
        });
    };
}

export function sendSuccessMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.EDIT_PROFILE_SUCCESS,
            messages: messages
        });
    };
}