import * as ActionType from "../constants/ActionType";

/**
 * Delete all messages from store.
 * @public
 * @returns {void}
 */
const clearMessages = () => dispatch => {
    return dispatch({
        type: ActionType.CLEAR_MESSAGES
    });
}

/**
 * Set failure message in store.
 * @public
 * @param {string} message Failure message.
 * @returns {void}
 */
const sendFailureMessage = message => dispatch => {
    return dispatch({
        type: ActionType.FAILURE_MESSAGE,
        message: message
    });
}

/**
 * Set failure messages in store.
 * @public
 * @param {Array<string>} messages Failure message list.
 * @returns {void}
 */
const sendFailureMessages = messages => dispatch => {
    return dispatch({
        type: ActionType.FAILURE_MESSAGES,
        messages: messages
    });
}

/**
 * Set success message in store.
 * @public
 * @param {string} message Success message.
 * @returns {void}
 */
const sendSuccessMessage = message => dispatch => {
    return dispatch({
        type: ActionType.SUCCESS_MESSAGE,
        message: message
    });
}

/**
 * Set success messages in store.
 * @public
 * @param {Array<string>} messages Success message list.
 * @returns {void}
 */
const sendSuccessMessages = messages => dispatch => {
    return dispatch({
        type: ActionType.SUCCESS_MESSAGES,
        messages: messages
    });
}

/**
 * Set information message in store.
 * @public
 * @param {string} message Information message.
 * @returns {void}
 */
const sendInfoMessage = message => dispatch => {
    return dispatch({
        type: ActionType.INFO_MESSAGE,
        message: message
    });
}

/**
 * Set information messages in store.
 * @public
 * @param {Array<string>} messages Information message list.
 * @returns {void}
 */
const sendInfoMessages = messages => dispatch => {
    return dispatch({
        type: ActionType.INFO_MESSAGES,
        messages: messages
    });
}

export {
    clearMessages,
    sendFailureMessage,
    sendFailureMessages,
    sendSuccessMessage,
    sendSuccessMessages,
    sendInfoMessage,
    sendInfoMessages
};