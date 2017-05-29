import * as ActionTypes from "../constants/ActionTypes";

export function clearMessages()
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CLEAR_MESSAGES
        });
    };
}

export function sendFailureMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.FAILURE_MESSAGE,
            messages: messages
        });
    };
}

export function sendSuccessMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.SUCCESS_MESSAGE,
            messages: messages
        });
    };
}