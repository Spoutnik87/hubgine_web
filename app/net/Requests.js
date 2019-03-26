import { api as config } from "../../client-config.json";
import * as Method from "../constants/RequestMethod";
import * as Endpoint from "../constants/RequestEndpoint";
import * as Type from "../constants/RequestType";
import * as Status from "../constants/RequestStatus";
import { isCached } from "../util/Metadata";
import * as Language from "../constants/Language";
/**
 * Serialize request's data.
 * @public
 * @param {Object<string,any>} data Object containing the data.
 * @returns {String} Serialized data.
 */
const serializeRequest = data => {
    let serializedData = "";
    let first = true;
    for (const key in data)
    {
        if (data[key] != null)
        {
            let element = "";
            if (Array.isArray(data[key]))
            {
                element = JSON.stringify(data[key]);
            }
            else
            {
                element = data[key];
            }
            serializedData += ((first ? "?" : "&").toString() + encodeURIComponent(key) + "=" + encodeURIComponent(element));
            if (first)
            {
                first = false;
            }
        }
    }
    return serializedData;
};

/**
 * @public
 * @param {Endpoint} endpoint Endpoint.
 * @param {string} serializedData Serialized data.
 * @returns {String} Request url.
 */
const buildURL = (endpoint, serializedData) => {
    return config.host + ":" + config.port + "/" + endpoint + serializedData;
};

/**
 * @public
 * @param {Method} method Method.
 * @param {Endpoint} endpoint Endpoint.
 * @param {string} token Token.
 * @param {Object<string,any>} data Data.
 * @returns {Promise<Object<string,any>>} Received data.
 */
const request = (method, endpoint, token, data) => new Promise((resolve, reject) => {
    const params = {
        method
    };
    if (token)
    {
        params.headers = {
            "Content-Type": "application/json",
            "X-API-KEY": token
        };
    }
    fetch(buildURL(endpoint, serializeRequest(data)), params).then(response => {
        switch (response.status)
        {
            case 200:
                response.json().then(result => {
                    resolve(result);
                }).catch(error => {
                    reject(error);
                });
                break;
            //Token invalid.
            case 401:
                reject(new Error(Status.UNAUTHORIZED));
                break;
            default:
                reject(new Error(Status.WRONG_STATUS));
        }
    });
});

/**
 * @public
 * @param {Method} method Method.
 * @param {Endpoint} endpoint Endpoint.
 * @param {string} token Token.
 * @param {Object<string,any>} data Data.
 * @param {Type} type Type.
 * @param {Object<string,any>} entity Entity.
 * @returns {Promise<Object<string,any>>} Received data.
 */
const requestIfNeeded = (method, endpoint, token, data, type, entity) => new Promise((resolve, reject) => {
    if (entity === undefined || (entity !== undefined && !isCached(entity, type)))
    {
        request(method, endpoint, token, data).then(result => resolve(result)).catch(error => reject(error));
    }
    else
    {
        reject(new Error(Status.DATA_CACHED));
    }
});

/**
 * Get users infos.
 * @public
 * @param {string} token User's token.
 * @param {Object<string, any>} user Actual user in store.
 * @returns {Promise<any>}
 */
const getUserInfos = (token, user) => {
    return requestIfNeeded(Method.GET, Endpoint.USER_GET, token, {}, Type.USER_FULL, user);
};

/**
 * Reset user's password.
 * @public
 * @param {string} email User's email.
 * @returns {Promise<any>}
 */
const resetPassword = (email) => {
    const data = { email };

    return request(Method.DELETE, Endpoint.TWITTERACCOUNT_DELETE, token, data);
};

/**
 * @public
 * @param {string} email Email.
 * @param {string} password Password.
 * @param {Object<string,any>} user User object in store.
 * @returns {Promise<any>}
 */
const getUser = (email, password, user) => {
    const data = { email, password };

    return requestIfNeeded(Method.GET, Endpoint.USER_LOGIN, undefined, data, Type.USER_BASIC, user);
};

/**
 * Add user.
 * @public
 * @param {string} email User's email.
 * @param {string} password User's password (clear).
 * @param {string} firstname User's firstname.
 * @param {string} lastname User's lastname.
 * @param {Language} lang User's lang.
 * @returns {Promise<any>}
 */
const addUser = (email, password, firstname, lastname, lang) => {
    const data = { email, password, firstname, lastname, lang };

    return request(Method.POST, Endpoint.USER_CREATE, undefined, data);
};

/**
 * Update user.
 * @public
 * @param {string} token User's token.
 * @param {string} new_email User's email?
 * @param {string} old_password User's old password. (clear)
 * @param {string} new_password User's new password. (clear)
 * @param {string} new_firstname User's new firstname.
 * @param {string} new_lastname User's new lastname.
 * @param {Language} new_lang User's new lang.
 * @returns {Promise<any>}
 */
const updateUser = (token, new_email, old_password, new_password, new_firstname, new_lastname, new_lang) => new Promise((resolve, reject) => {
    const data = { new_email, old_password, new_password, new_firstname, new_lastname, new_lang };

    if (!(new_email === null && old_password === null && new_password === null && new_firstname === null && new_lastname === null && new_lang === null))
    {
        request(Method.PUT, Endpoint.USER_UPDATE, token, data).then(result => resolve(result)).catch(error => reject(error));
    }
    else
    {
        reject(new Error(Status.NO_CHANGES));
    }
});

/**
 * Add account.
 * @public
 * @param {string} token User's token.
 * @param {string} name Account's name.
 * @param {string} consumer_key Account's consumer key.
 * @param {string} consumer_secret Account's consumer secret.
 * @param {string} access_token_key Account's access token key.
 * @param {string} access_token_secret Account's access token secret.
 * @param {Array<string>} blacklist Account's blacklist.
 * @returns {Promise<any>}
 */
const addAccount = (token, name, consumer_key, consumer_secret, access_token_key, access_token_secret, blacklist) => {
    const data = { name, consumer_key, consumer_secret, access_token_key, access_token_secret, blacklist };

    return request(Method.POST, Endpoint.TWITTERACCOUNT_CREATE, token, data);
};

/**
 * Update account.
 * @public
 * @param {string} token User's token.
 * @param {string} id Account's name.
 * @param {string} new_name Account's new name.
 * @param {string} new_consumer_key Account's consumer key.
 * @param {string} new_consumer_secret Account's consumer secret.
 * @param {string} new_access_token_key Account's access token key.
 * @param {string} new_access_token_secret Account's access token secret.
 * @param {Array<string>} new_blacklist Account's new blacklist.
 * @returns {Promise<any>}
 */
const updateAccount = (token, id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret, new_blacklist) => new Promise((resolve, reject) => {
    const data = { id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret, new_blacklist };

    if (!(new_name == null && new_consumer_key == null && new_consumer_secret == null && new_access_token_key == null && new_access_token_secret == null && new_blacklist == null))
    {
        request(Method.PUT, Endpoint.TWITTERACCOUNT_UPDATE, token, data).then(result => resolve(result)).catch(error => reject(error));
    }
    else
    {
        reject(new Error(Status.NO_CHANGES));
    }
});

/**
 * Delete an account.
 * @public
 * @param {string} token User's token.
 * @param {string} id Account's name.
 * @returns {Promise<any>}
 */
const removeAccount = (token, id) => {
    const data = { id };

    return request(Method.DELETE, Endpoint.TWITTERACCOUNT_DELETE, token, data);
};

/**
 * Get account list.
 * @public
 * @param {string} token User's token.
 * @param {Array<Object>} accounts Account list in store.
 * @returns {Promise<any>}
 */
const getAccountList = (token, accounts) => {
    return requestIfNeeded(Method.GET, Endpoint.ACCOUNT_GET_LIST, token, {}, Type.ACCOUNT_LIST, accounts);
};

/**
 * Add campaign.
 * @public
 * @param {string} token User's token.
 * @param {string} account_id Account's name.
 * @param {string} name Campaign's name.
 * @param {number} date_begin Campaign's date begin.
 * @param {number} date_end Campaign's date end.
 * @returns {Promise<any>}
 */
const addCampaign = (token, account_id, name, date_begin, date_end) => {
    const data = { account_id, name, date_begin, date_end };

    return request(Method.POST, Endpoint.CAMPAIGN_CREATE, token, data);
};

/**
 * Update campaign.
 * @public
 * @param {string} token User's token.
 * @param {string} account_id Account's name.
 * @param {string} campaign_id Campaign's name.
 * @param {string} new_name Campaign's new name.
 * @param {number} new_date_begin Campaign's new date begin.
 * @param {number} new_date_end Campaign's new date end.
 * @returns {Promise<any>}
 */
const updateCampaign = (token, account_id, campaign_id, new_name, new_date_begin, new_date_end) => new Promise((resolve, reject) => {
    const data = { account_id, campaign_id, new_name, new_date_begin, new_date_end };

    if (!(new_name == null && new_date_begin == null && new_date_end == null))
    {
        request(Method.PUT, Endpoint.CAMPAIGN_UPDATE, token, data).then(result => resolve(result)).catch(error => reject(error));
    }
    else
    {
        reject(new Error(Status.NO_CHANGES));
    }
});

/**
 * Remove campaign.
 * @public
 * @param {string} token User's token.
 * @param {string} account_id Account's name.
 * @param {string} campaign_id Campaign's name.
 * @returns {Promise<any>}
 */
const removeCampaign = (token, account_id, campaign_id) => {
    const data = { account_id, campaign_id };

    return request(Method.DELETE, Endpoint.CAMPAIGN_DELETE, token, data);
};

/**
 * Add a twitter rule.
 * @public
 * @param {string} token User's token.
 * @param {string} account_id Account's name.
 * @param {string} campaign_id Campaign's name.
 * @param {string} name Rule's name.
 * @param {string} type Rule's type.
 * @param {Object<string, string>} messages Rule's messages.
 * @param {Object<string, string>} track Rule's track.
 * @param {string} condition Rule's condition.
 * @param {number} delay Rule's delay.
 * @param {number} undo Rule's undo.
 * @param {Array<string>} lang Rule's lang.
 * @returns {Promise<any>}
 */
const addTwitterRule = (token, account_id, campaign_id, name, type, messages, track, condition, delay, undo, lang) => {
    const data = { account_id, campaign_id, name, type, messages, track, condition, delay, undo, lang };

    return request(Method.POST, Endpoint.TWITTERRULE_CREATE, token, data);
};

/**
 * Update twitter rule.
 * @public
 * @param {string} token User's token.
 * @param {string} account_id Account's name.
 * @param {string} campaign_id Campaign's name.
 * @param {string} rule_id Rule's name.
 * @param {string} new_name Rule's new name.
 * @param {string} new_type Rule's new type.
 * @param {Object<string, any>} new_messages Rule's new messages.
 * @param {Object<string, string>} new_track Rule's new track.
 * @param {string} new_condition Rule's new condition.
 * @param {number} new_delay Rule's new delay.
 * @param {number} new_undo Rule's new undo.
 * @param {Array<string>} new_lang Rule's new lang.
 * @returns {Promise<any>}
 */
const updateTwitterRule = (token, account_id, campaign_id, rule_id, new_name, new_type, new_messages, new_track, new_condition, new_delay, new_undo, new_lang) => new Promise ((resolve, reject) => {
    const data = { account_id, campaign_id, rule_id, new_name, new_type, new_messages, new_track, new_condition, new_delay, new_undo, new_lang };
    if (!(new_name == null && new_type == null && new_messages == null && new_track == null && new_condition == null && new_delay == null && new_undo == null && new_lang == null))
    {
        request(Method.PUT, Endpoint.TWITTERRULE_UPDATE, token, data).then(result => resolve(result)).catch(error => reject(error));
    }
    else
    {
        reject(new Error(Status.NO_CHANGES));
    }
});

/**
 * Remove twitter rule.
 * @public
 * @param {string} token User's token.
 * @param {string} account_id Account's name.
 * @param {string} campaign_id Campaign's name.
 * @param {string} rule_id Rule's name.
 * @returns {Promise<any>} 
 */
const removeTwitterRule = (token, account_id, campaign_id, rule_id) => {
    const data = { account_id, campaign_id, rule_id };

    return request(Method.DELETE, Endpoint.TWITTERRULE_DELETE, token, data);
};

/**
 * Contact request.
 * @public
 * @param {number} reason
 * @param {string} email
 * @param {string} message
 * @param {string} recaptcha
 */
const contact = (reason, email, message, recaptcha) => {
    const data = { reason, email, message, recaptcha };

    return request(Method.POST, Endpoint.CONTACT_POST, undefined, data);
};

export {
    getUserInfos,
    resetPassword,
    getUser,
    addUser,
    updateUser,
    addAccount,
    updateAccount,
    removeAccount,
    getAccountList,
    addCampaign,
    updateCampaign,
    removeCampaign,
    addTwitterRule,
    updateTwitterRule,
    removeTwitterRule,
    contact
};