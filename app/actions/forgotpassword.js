import * as types from '../constants/ActionTypes';

export function sendFailureMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.FORGOTPASSWORD_FORM_FAILURE,
            messages: messages
        });
    };
}

export function sendSuccessMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.FORGOTPASSWORD_FORM_SUCCESS,
            messages: messages
        });
    };
}