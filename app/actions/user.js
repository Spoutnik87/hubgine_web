import { setCookie, getCookie, removeCookie } from "redux-cookie";
import { isValidEmail, isValidPassword, isValidFirstname, isValidLastname, isValidLanguage } from "validator";
import { getUser, addUser, getMaxAccounts, getUserInfos, updateUser as updateUserAPI } from "../net/Requests";
import * as ActionTypes from "../constants/ActionTypes";
import * as Errors from "../constants/ErrorTypes";
import * as Languages from "../constants/Languages";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage } from "./messages";
import { changeLanguage } from "./lang";

export function connect(email, password)
{
	return (dispatch, getState) => {
		const {
			LANG,
			SIGNIN_EMAIL_INCORRECT,
			SIGNIN_PASSWORD_INCORRECT,
			SIGNIN_CREDENTIALS_INCORRECT
		} = getState().lang;
		const messages = [];
	    if (!isValidEmail(email))
	    {
	        messages.push(SIGNIN_EMAIL_INCORRECT);
	    }
	    if (!isValidPassword(password))
	    {
	        messages.push(SIGNIN_PASSWORD_INCORRECT);
	    }
		if (messages.length === 0)
		{
			return getUser(email, password).then(result => {
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
	            }));
	            return Promise.resolve();
	        }).catch(error => {
	            dispatch(sendFailureMessage(SIGNIN_CREDENTIALS_INCORRECT));
	            return Promise.reject(error);
	        });
		}
		else
		{
			dispatch(sendFailureMessages(messages));
			return Promise.reject(new Error(Errors.ERROR_INVALID_INPUTS));
		}
    };
}

export function register(email, password, cpassword, firstname, lastname, lang, useterms, recaptcha)
{
	return (dispatch, getState) => {
		const {
			LANG,
			REGISTER_FIRSTNAME_INCORRECT,
			REGISTER_LASTNAME_INCORRECT,
			REGISTER_EMAIL_INCORRECT,
            REGISTER_PASSWORD_INCORRECT,
			REGISTER_PASSWORD_NOT_MATCH,
			REGISTER_USETERMS_INCORRECT,
			REGISTER_ERROR
		} = getState().lang;
		let messages = [];
		if (!isValidFirstname(firstname))
        {
            messages.push(REGISTER_FIRSTNAME_INCORRECT);
        }
        if (!isValidLastname(lastname))
        {
            messages.push(REGISTER_LASTNAME_INCORRECT);
        }
        if (!isValidEmail(email))
        {
            messages.push(REGISTER_EMAIL_INCORRECT);
        }
        if (!isValidPassword(password))
        {
            messages.push(REGISTER_PASSWORD_INCORRECT);
		}
		if (!isValidLanguage(lang, Object.values(Languages)))
        if (password !== cpassword)
        {
            messages.push(REGISTER_PASSWORD_NOT_MATCH);
        }
        if (!useterms)
        {
            messages.push(REGISTER_USETERMS_INCORRECT);
        }
		if (messages.length === 0)
		{
			return addUser(email, password, firstname, lastname, lang, recaptcha).then(result => {
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
					email,
					token: result.token,
				  	rank: result.rank,
				  	lang: result.lang
				}));
		      	return Promise.resolve();
			}).catch(error => {
				dispatch(sendFailureMessage(REGISTER_ERROR));
				return Promise.reject(error);
			});
		}
		else
		{
			dispatch(sendFailureMessages(messages));
			return Promise.reject(new Error(Errors.ERROR_INVALID_INPUTS));
		}
	};
}

export function fetchUser()
{
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.user;
		return getUserInfos(token, state.user).then(result => {
			dispatch({
				type: ActionTypes.USER_UPDATE_INFOS,
				email: result.email,
				firstname: result.firstname,
				lastname: result.lastname,
				maxAccounts: result.max_accounts
			});
			return Promise.resolve();
		}).catch(error => {
			if (error.message === Errors.ERROR_DATA_CACHED)
			{
				return Promise.resolve();
			}
			else if (error.message === Errors.ERROR_INVALID_TOKEN)
            {
                const { SESSION_EXPIRED } = state.lang;
				dispatch(disconnect());
				dispatch(sendFailureMessage(SESSION_EXPIRED));
				return Promise.reject(error);
            }
			else
			{
				return Promise.reject(error);
			}
		});
	};
}

export function disconnect()
{
    return (dispatch) => {
        dispatch({
            type: ActionTypes.USER_UNSET
		});
		dispatch(removeCookie("user"));
		return Promise.resolve();
    };
}

export function updateUser(email, password, firstname, lastname, lang)
{
	return (dispatch, getState) => {
		const state = getState();
		const {
			USER_EMAIL_INCORRECT,
			USER_PASSWORD_INCORRECT,
			USER_FIRSTNAME_INCORRECT,
			USER_LASTNAME_INCORRECT,
			USER_LANGUAGE_INCORRECT,
			GENERIC_ERROR,
			USER_EDIT_SUCCESS
		} = state.lang;
		const messages = [];
		if (typeof email === "string" && !isValidEmail(email))
		{
			messages.push(USER_EMAIL_INCORRECT);
		}
		if (typeof password === "string" && !isValidPassword(password))
		{
			messages.push(USER_PASSWORD_INCORRECT);
		}
		if (typeof firstname === "string" && !isValidFirstname(firstname))
		{
			messages.push(USER_FIRSTNAME_INCORRECT);
		}
		if (typeof lastname === "string" && !isValidLastname(lastname))
		{
			messages.push(USER_LASTNAME_INCORRECT);
		}
		if (typeof lang === "string" && !isValidLanguage(lang, Object.values(Languages)))
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
			const newPassword = password || null;
			const newFirstname = firstname !== initialFirstname ? firstname : null;
			const newLastname = lastname !== initialLastname ? lastname : null;
			const newLang = lang !== initialLang ? lang : null;
			return updateUserAPI(state.user.token, newEmail, newPassword, newFirstname, newLastname, newLang).then(result => {
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
				}));
				dispatch(sendSuccessMessage(USER_EDIT_SUCCESS));
				return Promise.resolve();
			}).catch(error => {
				if (error.message === Errors.ERROR_NO_CHANGES)
				{
					return Promise.resolve();
				}
				else
				{
					dispatch(sendFailureMessage(GENERIC_ERROR));
					return Promise.reject(error);
				}
			});
		}
		else
		{
			dispatch(sendFailureMessages(messages));
			return Promise.reject(new Error(Errors.ERROR_INVALID_INPUTS));
		}
	};
}