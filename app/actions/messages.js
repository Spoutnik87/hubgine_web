import * as types from '../constants/ActionTypes';

export function clearMessages()
{
    return (dispatch) => {
        return dispatch({ 
            type: types.CLEAR_MESSAGES
        });
    };
}
