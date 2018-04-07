import { contact as contactAPI } from "../net/Requests";
import * as ActionTypes from "../constants/ActionTypes";
import * as ContactTypes from "../constants/ContactTypes";

/**
 * Contact admins.
 * @public
 * @param {ContactTypes} reason Reason.
 * @param {string} email Optional email.
 * @param {string} message Message.
 * @returns {Promise<void>}
 */
const contact = (reason, email, message) => (dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const {
        TWITTERRULE_DELETE_ERROR,
        TWITTERRULE_DELETE_SUCCESS
    } = state.lang;
    const { token } = state.user;
    contactAPI(token, accountId, campaignId, ruleId).then(result => {
        dispatch({
            type: ActionTypes.TWITTERRULE_DELETE,
            accountId: accountId,
            campaignId: campaignId,
            ruleId: ruleId
        });
        dispatch(sendSuccessMessage(TWITTERRULE_DELETE_SUCCESS));
        resolve();
    }).catch(error => {
        dispatch(sendFailureMessage(TWITTERRULE_DELETE_ERROR));
        reject(error);
    });
});

export {
    contact
};