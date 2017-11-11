import * as ActionTypes from "../constants/ActionTypes";

export function clearMessages()
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.CLEAR_MESSAGES
        });
    };
}

export function sendFailureMessage(message)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.FAILURE_MESSAGE,
            message: message
        });
    };
}

export function sendFailureMessages(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.FAILURE_MESSAGES,
            messages: messages
        });
    };
}

export function sendSuccessMessage(message)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.SUCCESS_MESSAGE,
            message: message
        });
    };
}

export function sendSuccessMessages(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.SUCCESS_MESSAGES,
            messages: messages
        });
    };
}

export function sendInfoMessage(message)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.INFO_MESSAGE,
            message: message
        });
    };
}

export function sendInfoMessages(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: ActionTypes.INFO_MESSAGES,
            messages: messages
        });
    };
}