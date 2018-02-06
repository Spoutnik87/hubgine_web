import { setCookie, removeCookie } from "redux-cookie";
import { isValidEmail, isValidPassword, isValidFirstname, isValidLastname, isValidLanguage, isValidSignupForm, isValidSigninForm } from "validator";
import { getUser, addUser, getMaxAccounts, getUserInfos, updateUser as updateUserAPI } from "../net/Requests";
import * as ActionTypes from "../constants/ActionTypes";
import * as Status from "../constants/RequestStatus";
import * as Languages from "../constants/Languages";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage } from "./messages";
import { changeLanguage } from "./lang";

/**
 * Connect.
 * @public
 * @param {string} email User's email.
 * @param {string} password User's password. (clear)
 * @returns {Promise<void>}
 */
const connect = (email, password) => (dispatch, getState) => new Promise((resolve, reject) => {
	const {
		LANG,
		SIGNIN_EMAIL_INCORRECT,
		SIGNIN_PASSWORD_INCORRECT,
		SIGNIN_CREDENTIALS_INCORRECT
	} = getState().lang;
	let messages = [];
	const result = isValidSigninForm(email, password, SIGNIN_EMAIL_INCORRECT, SIGNIN_PASSWORD_INCORRECT, true, false);
	if (Array.isArray(result))
	{
		messages = messages.concat(result);
	}
	if (messages.length === 0)
	{
		getUser(email, password).then(result => {
			dispatch({
				type: ActionTypes.USER_SET,
				token: result.token,
				email: email,
				rank: result.rank,
				lang: result.lang
			});
			if (LANG !== result.lang)
			{
				dispatch(changeLanguage(result.lang));
			}
			dispatch(setCookie("user", {
				token: result.token,
				email: email,
				rank: result.rank,
				lang: result.lang
			}, {
				path: "/"
			}));
			resolve();
		}).catch(error => {
			dispatch(sendFailureMessage(SIGNIN_CREDENTIALS_INCORRECT));
			reject(error);
		});
	}
	else
	{
		dispatch(sendFailureMessages(messages));
		reject(new Error(Status.INVALID_INPUTS));
	}
});

/**
 * Register.
 * @public
 * @param {string} email User's email.
 * @param {string} password User's password. (clear)
 * @param {string} cpassword User's confirm password. (clear)
 * @param {string} firstname User's firstname.
 * @param {string} lastname User's lastname.
 * @param {Languages} lang User's lang.
 * @param {boolean} useterms User's userterms.
 * @param {string} recaptcha User's recaptcha.
 * @returns {Promise<void>}
 */
const register = (email, password, cpassword, firstname, lastname, lang, useterms, recaptcha) => (dispatch, getState) => new Promise((resolve, reject) => {
	const {
		LANG,
		REGISTER_FIRSTNAME_INCORRECT,
		REGISTER_LASTNAME_INCORRECT,
		REGISTER_EMAIL_INCORRECT,
		REGISTER_PASSWORD_INCORRECT,
		REGISTER_PASSWORD_NOT_MATCH,
		REGISTER_USETERMS_INCORRECT,
		REGISTER_LANG_INCORRECT,
		REGISTER_ERROR
	} = getState().lang;
	let messages = [];
	const result = isValidSignupForm(email, password, cpassword, firstname, lastname, lang, Object.values(Languages), 
		REGISTER_EMAIL_INCORRECT, REGISTER_PASSWORD_INCORRECT, REGISTER_PASSWORD_NOT_MATCH, REGISTER_FIRSTNAME_INCORRECT, REGISTER_LASTNAME_INCORRECT, REGISTER_LANG_INCORRECT, true, false);
	if (Array.isArray(result))
	{
		messages = messages.concat(result);
	}
	if (!useterms)
	{
		messages.push(REGISTER_USETERMS_INCORRECT);
	}
	if (messages.length === 0)
	{
		addUser(email, password, firstname, lastname, lang, recaptcha).then(result => {
			dispatch({
				type: ActionTypes.USER_SET,
				token: result.token,
				email: email,
				rank: result.rank,
				lang: result.lang
			});
			if (LANG !== result.lang)
			{
				dispatch(changeLanguage(result.lang));
			}
			dispatch(setCookie("user", {
				email: email,
				token: result.token,
				rank: result.rank,
				lang: result.lang
			}, {
				path: "/"
			}));
			resolve();
		}).catch(error => {
			dispatch(sendFailureMessage(REGISTER_ERROR));
			reject(error);
		});
	}
	else
	{
		dispatch(sendFailureMessages(messages));
		reject(new Error(Status.INVALID_INPUTS));
	}
});

/**
 * Fetch user informations.
 * @public
 * @returns {Promise<void>}
 */
const fetchUser = () => (dispatch, getState) => new Promise((resolve, reject) => {
	const state = getState();
	const { token } = state.user;
	getUserInfos(token, state.user).then(result => {
		dispatch({
			type: ActionTypes.USER_UPDATE_INFOS,
			email: result.email,
			firstname: result.firstname,
			lastname: result.lastname,
			maxAccounts: result.max_accounts
		});
		resolve();
	}).catch(error => {
		if (error.message === Status.DATA_CACHED)
		{
			resolve();
		}
		else if (error.message === Status.UNAUTHORIZED)
		{
			const { SESSION_EXPIRED } = state.lang;
			dispatch(disconnect());
			dispatch(sendFailureMessage(SESSION_EXPIRED));
			reject(error);
		}
		else
		{
			reject(error);
		}
	});
});

/**
 * Disconnect.
 * @public
 * @returns {Promise<void>}
 */
const disconnect = () => dispatch => new Promise((resolve, reject) => {
	dispatch({
		type: ActionTypes.USER_UNSET
	});
	dispatch({
		type: ActionTypes.ACCOUNTS_UNSET
	});
	dispatch(removeCookie("user", {
		path: "/"
	}));
	resolve();
});

/**
 * Update user.
 * @public
 * @param {string} email User's email.
 * @param {string} oldpassword User's old password. (clear)
 * @param {string} password User's new password. (clear)
 * @param {string} cpassword User's new confirm password. (clear)
 * @param {string} firstname User's new firstname.
 * @param {string} lastname User's new lastname.
 * @param {Languages} lang User's new language.
 * @returns {Promise<void>}
 */
const updateUser = (email, oldpassword, password, cpassword, firstname, lastname, lang) => (dispatch, getState) => new Promise((resolve, reject) => {
	const state = getState();
	const {
		USER_EMAIL_INCORRECT,
		USER_PASSWORD_INCORRECT,
		USER_PASSWORD_NOT_MATCH,
		USER_FIRSTNAME_INCORRECT,
		USER_LASTNAME_INCORRECT,
		USER_LANGUAGE_INCORRECT,
		GENERIC_ERROR,
		USERPASSWORDFORM_EDIT_ERROR
	} = state.lang;
	const messages = [];
	if (email != null && !isValidEmail(email))
	{
		messages.push(USER_EMAIL_INCORRECT);
	}
	if (oldpassword != null && !isValidPassword(oldpassword))
	{
		messages.push(USER_PASSWORD_INCORRECT);
	}
	if (password != null && !isValidPassword(password))
	{
		messages.push(USER_PASSWORD_INCORRECT);
	}
	if (password !== cpassword)
	{
		messages.push(USER_PASSWORD_NOT_MATCH);
	}
	if (firstname != null && !isValidFirstname(firstname))
	{
		messages.push(USER_FIRSTNAME_INCORRECT);
	}
	if (lastname != null && !isValidLastname(lastname))
	{
		messages.push(USER_LASTNAME_INCORRECT);
	}
	if (lang != null && !isValidLanguage(lang, Object.values(Languages)))
	{
		messages.push(USER_LANGUAGE_INCORRECT);
	}
	if (messages.length === 0)
	{
		const {
			email: initialEmail,
			token: initialToken,
			firstname: initialFirstname,
			lastname: initialLastname,
			lang: initialLang,
			rank: initialRank
		} = state.user;
		const newEmail = email !== initialEmail ? email : null;
		const oldPassword = oldpassword || null;
		const newPassword = password || null;
		const newFirstname = firstname !== initialFirstname ? firstname : null;
		const newLastname = lastname !== initialLastname ? lastname : null;
		const newLang = lang !== initialLang ? lang : null;
		updateUserAPI(initialToken, newEmail, oldPassword, newPassword, newFirstname, newLastname, newLang).then(result => {
			dispatch({
				type: ActionTypes.USER_UPDATE,
				email,
				firstname,
				lastname,
				lang
			});
			if (newLang)
			{
				dispatch(changeLanguage(lang));
			}
			dispatch(setCookie("user", {
				email: newEmail || initialEmail,
				token: initialToken,
				lang: newLang || initialLang,
				rank: initialRank
			}, {
				path: "/"
			}));
			const {
				USER_EDIT_SUCCESS
			} = getState().lang;
			dispatch(sendSuccessMessage(USER_EDIT_SUCCESS));
			resolve();
		}).catch(error => {
			if (error.message === Status.NO_CHANGES)
			{
				resolve();
			}
			else
			{
				if (password !== null)
				{
					dispatch(sendFailureMessage(USERPASSWORDFORM_EDIT_ERROR));
				}
				else
				{
					dispatch(sendFailureMessage(GENERIC_ERROR));
				}
				reject(error);
			}
		});
	}
	else
	{
		dispatch(sendFailureMessages(messages));
		reject(new Error(Status.INVALID_INPUTS));
	}
});

export {
	connect,
	register,
	fetchUser,
	disconnect,
	updateUser
};