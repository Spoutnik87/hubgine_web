import { api as config } from "../../client-config.json";
import * as Methods from "../constants/RequestMethods";
import * as Endpoints from "../constants/RequestEndpoints";
import * as Types from "../constants/RequestTypes";
import * as Errors from "../constants/ErrorTypes";
import { isCached } from "../util/Metadata";

const serializeRequest = (data) => {
    let serializedData = "";
    let first = true;
    for (const key in data)
    {
        if (data.hasOwnProperty(key) && data[key] !== null)
        {
            serializedData += ((first ? "?" : "&").toString() + key + "=" + data[key]);
        }
        if (first) first = false;
    }
    return serializedData;
};

const buildURL = (endpoint, serializedData) => {
    return config.host + ":" + config.port + "/" + endpoint + serializedData;
};

const request = (method, endpoint, data) => {
    return fetch(buildURL(endpoint, serializeRequest(data)), {
        method
    }).then(response => {
        if (response.status === 200)
        {
            return Promise.resolve(response);
        }
        else
        {
            return Promise.reject(new Error(Errors.REQUEST_ERROR));
        }
    }).then(response => response.json());
};

const requestIfNeeded = (method, endpoint, data, type, entity) => {
    if (entity === undefined || (entity !== undefined && !isCached(entity, type)))
    {
        return request(method, endpoint, data);
    }
    else
    {
        return Promise.reject(new Error(Errors.ERROR_DATA_CACHED));
    }
};

export const getUser = (email, password, user) => {
  const data = { email, password };

  return requestIfNeeded(Methods.GET, Endpoints.USER_LOGIN, data, Types.USER_BASIC, user);
};

export const getMaxAccounts = (email, token, user) => {
    const data  = { email, token };

    return requestIfNeeded(Methods.GET, Endpoints.USER_GET_MAX_ACCOUNTS, data, Types.USER_MAX_ACCOUNTS, user);
};

export const addUser = (email, password, firstname, lastname, lang) => {
    const data = { email, password, firstname, lastname, lang };

    return request(Methods.POST, Endpoints.USER_CREATE, data);
};

export const addAccount = (email, token, name, consumer_key, consumer_secret, access_token_key, access_token_secret) => {
    const data = { email, token, name, consumer_key, consumer_secret, access_token_key, access_token_secret };

    return request(Methods.POST, Endpoints.TWITTERACCOUNT_CREATE, data);
};

export const removeAccount = (email, token, id) => {
    const data = { email, token, id };

    return request(Methods.DELETE, Endpoints.TWITTERACCOUNT_DELETE, data);
};

export const resetPassword = (email) => {
    const data = { email };

    return request(Methods.DELETE, Endpoints.TWITTERACCOUNT_DELETE, data);
};

export const getUserInfos = (email, token, user) => {
    const data = { email, token };

    return requestIfNeeded(Methods.GET, Endpoints.USER_GET, data, Types.USER_NAME, user);
};

export const updateUser = (email, token, new_email, new_password, new_firstname, new_lastname, new_lang) => {
    const data = { email, token, new_email, new_password, new_firstname, new_lastname, new_lang };

    if (!(new_email === null && new_password === null && new_firstname === null && new_lastname === null && new_lang === null))
    {
        return request(Methods.PUT, Endpoints.USER_UPDATE, data);
    }
    else
    {
        return Promise.reject(new Error(Errors.ERROR_NO_CHANGES));
    }
};

export const updateAccount = (email, token, id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret) => {
    const data = { email, token, id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret };

    if (!(new_name === null && new_consumer_key === null && new_consumer_secret === null && new_access_token_key === null && new_access_token_secret === null))
    {
        return request(Methods.PUT, Endpoints.TWITTERACCOUNT_UPDATE, data);
    }
    else
    {
        return Promise.reject(new Error(Errors.ERROR_NO_CHANGES));
    }
};

export const getAccountList = (email, token, accounts) => {
    const data = { email, token };

    return requestIfNeeded(Methods.GET, Endpoints.ACCOUNT_GET_LIST, data, Types.ACCOUNT_LIST_NAME, accounts);
};

export const getAccountNameList = (email, token, accounts) => {
    const data = { email, token };

    return requestIfNeeded(Methods.GET, Endpoints.ACCOUNT_GET_LIST_NAME, data, Types.ACCOUNT_LIST_NAME, accounts);
};

export const getTwitterAccount = (email, token, id) => {
    const data = { email, token, id };

    return request(Methods.GET, Endpoints.TWITTERACCOUNT_GET, data);
};

export const getTwitterAccountKeys = (email, token, id, account) => {
    const data = { email, token, id };

    return requestIfNeeded(Methods.GET, Endpoints.TWITTERACCOUNT_GET_KEYS, data, Types.ACCOUNT_KEYS, account);
};

export const addCampaign = (email, token, account_id, name, date_begin, date_end) => {
    const data = { email, token, account_id, name, date_begin, date_end };

    return request(Methods.POST, Endpoints.CAMPAIGN_CREATE, data);
};

export const removeCampaign = (email, token, account_id, campaign_id) => {
    const data = { email, token, account_id, campaign_id };

    return request(Methods.DELETE, Endpoints.CAMPAIGN_DELETE, data);
};

export const updateCampaign = (email, token, account_id, campaign_id, new_name, new_date_begin, new_date_end) => {
    const data = { email, token, account_id, campaign_id, new_name, new_date_begin, new_date_end };

    if (!(new_name === null && new_date_begin === null && new_date_end === null))
    {
        return request(Methods.PUT, Endpoints.CAMPAIGN_UPDATE, data);
    }
    else
    {
        return Promise.reject(new Error(Errors.ERROR_NO_CHANGES));
    }
};

export const getCampaignList = (email, token, account_id, campaigns) => {
    const data = { email, token, account_id };

    return requestIfNeeded(Methods.GET, Endpoints.CAMPAIGN_GET_LIST, data, Types.CAMPAIGN_LIST, campaigns);
};

export const getCampaign = (email, token, account_id, campaign_id, campaign) => {
    const data = { email, token, account_id, campaign_id };

    return requestIfNeeded(Methods.GET, Endpoints.CAMPAIGN_GET, data, Types.CAMPAIGN_FULL, campaign);
};