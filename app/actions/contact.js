import { isValidContactForm } from "validator";
import { contact as contactAPI } from "../net/Requests";
import * as Status from "../constants/RequestStatus";
import * as ActionType from "../constants/ActionType";
import * as ContactType from "../constants/ContactType";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage } from "./messages";

/**
 * Contact admins.
 * @public
 * @param {ContactType} reason Reason.
 * @param {string} email Optional email.
 * @param {string} message Message.
 * @param {string} recaptcha Recaptcha.
 * @returns {Promise<void>}
 */
const contact = (reason, email, message, recaptcha) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        CONTACT_ERROR,
        CONTACT_SUCCESS,
        CONTACT_REASON_INCORRECT,
        CONTACT_EMAIL_INCORRECT,
        CONTACT_MESSAGE_INCORRECT
    } = state.lang;
    let messages = [];
    const result = isValidContactForm(reason, Object.values(ContactType), email, message, 
        CONTACT_REASON_INCORRECT, CONTACT_EMAIL_INCORRECT, CONTACT_MESSAGE_INCORRECT, true, false);
    if (Array.isArray(result))
    {
        messages = messages.concat(result);
    }
    if (messages.length === 0)
    {
        contactAPI(reason, email, message, recaptcha).then(result => {
            dispatch(sendSuccessMessage(CONTACT_SUCCESS));
            resolve();
        }).catch(error => {
            dispatch(sendFailureMessage(CONTACT_ERROR));
            reject(error);
        });
    }
    else
    {
        dispatch(sendFailureMessages(messages));
        reject(new Error(Status.INVALID_INPUTS));
    }
});

export {
    contact
};