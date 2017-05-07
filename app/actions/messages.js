import * as types from "../constants/ActionTypes";

export function clearMessages()
{
    return (dispatch) => {
        return dispatch({ 
            type: types.CLEAR_MESSAGES
        });
    };
}

export function sendFailureMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.FAILURE_MESSAGE,
            messages: messages
        });
    };
}

export function sendSuccessMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.SUCCESS_MESSAGE,
            messages: messages
        });
    };
}