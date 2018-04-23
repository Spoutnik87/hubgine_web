import { FAILURE_MESSAGE, FAILURE_MESSAGES, SUCCESS_MESSAGE, SUCCESS_MESSAGES,
    INFO_MESSAGE, INFO_MESSAGES, CLEAR_MESSAGES } from "../constants/ActionType";

/**
 * Messages reducer.
 * @param {Object<any,any>} state Messages store state.
 * @param {string} action ActionType.
 */
const messages = (state = {}, action) => {
    switch (action.type)
    {
        case FAILURE_MESSAGE:
            return {
                error: [
                    {
                        msg: action.message
                    }
                ]
            };
        case FAILURE_MESSAGES:
            return {
                error: action.messages.map(message => ({ msg: message }))
            };
        case SUCCESS_MESSAGE:
            return {
                success: [
                    {
                        msg: action.message
                    }
                ]
            };
        case SUCCESS_MESSAGES:
            return {
                success: action.messages.map(message => ({ msg: message }))
            };
        case INFO_MESSAGE:
            return {
                info: [
                    {
                        msg: action.message
                    }
                ]
            };
        case INFO_MESSAGES:
            return {
                info: action.messages.map(message => ({ msg: message }))
            };
        case CLEAR_MESSAGES:
            return {};
        default:
            return state;
    }
};

export default messages;