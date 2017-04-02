import * as types from '../constants/ActionTypes';


export function sendFailureMessage(messages)
{
    return (dispatch) => {
        return dispatch({ 
            type: types.REGISTER_FORM_FAILURE,
            messages: messages
        });
    };
}