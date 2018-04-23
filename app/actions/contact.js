import { contact as contactAPI } from "../net/Requests";
import * as ActionType from "../constants/ActionType";
import * as ContactType from "../constants/ContactType";

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
        CONTACT_SUCCESS
    } = state.lang;
    contactAPI(reason, email, message, recaptcha).then(result => {
        dispatch(sendSuccessMessage(CONTACT_SUCCESS));
        resolve();
    }).catch(error => {
        dispatch(sendFailureMessage(CONTACT_ERROR));
        reject(error);
    });
});

export {
    contact
};