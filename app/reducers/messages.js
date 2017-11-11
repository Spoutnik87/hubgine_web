import * as ActionTypes from "../constants/ActionTypes";

export default function messages(state = {}, action)
{
    switch (action.type)
    {
        case ActionTypes.FAILURE_MESSAGE:
            return {
                error: [
                    {
                        msg: action.message
                    }
                ]
            };
        case ActionTypes.FAILURE_MESSAGES:
            return {
                error: action.messages.map(message => ({ msg: message }))
            };
        case ActionTypes.SUCCESS_MESSAGE:
            return {
                success: [
                    {
                        msg: action.message
                    }
                ]
            };
        case ActionTypes.SUCCESS_MESSAGES:
            return {
                success: action.messages.map(message => ({ msg: message }))
            };
        case ActionTypes.INFO_MESSAGE:
            return {
                info: [
                    {
                        msg: action.message
                    }
                ]
            };
        case ActionTypes.INFO_MESSAGES:
            return {
                info: action.messages.map(message => ({ msg: message }))
            };
        case ActionTypes.CLEAR_MESSAGES:
            return {};
        default:
            return state;
    }
}