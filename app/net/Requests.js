import { api as config } from "../../client-config.json";
import * as Methods from "../constants/RequestMethods";
import * as Endpoints from "../constants/RequestEndpoints";
import * as Types from "../constants/RequestTypes";
import * as Errors from "../constants/ErrorTypes";
import { isCached } from "../util/Metadata";

const serializeRequest = (data) => {
    let serializedData = "";
    let first = true;
    for (let key of Object.keys(data))
    {
        if (data[key] !== null)
        {
            serializedData += ((first ? "?" : "&").toString() + key + "=" + data[key]);
            if (first)
            {
                first = false;
            }
        }
    }
    return serializedData;
};

const buildURL = (endpoint, serializedData) => {
    return config.host + ":" + config.port + "/" + endpoint + serializedData;
};

const request = (method, endpoint, token, data) => {
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
    return fetch(buildURL(endpoint, serializeRequest(data)), params).then(response => {
        if (response.status === 200)
        {
            return Promise.resolve(response);
        }
        //TOKEN INVALID
        else if (response.status === 401)
        {
            return Promise.reject(new Error(Errors.ERROR_INVALID_TOKEN));
        }
        else
        {
            return Promise.reject(new Error(Errors.REQUEST_ERROR));
        }
    }).then(response => response.json());
};

const requestIfNeeded = (method, endpoint, token, data, type, entity) => {
    if (entity === undefined || (entity !== undefined && !isCached(entity, type)))
    {
        return request(method, endpoint, token, data);
    }
    else
    {
        return Promise.reject(new Error(Errors.ERROR_DATA_CACHED));
    }
};

export const getUser = (email, password, user) => {
    const data = { email, password };

    return requestIfNeeded(Methods.GET, Endpoints.USER_LOGIN, null, data, Types.USER_BASIC, user);
};

export const addUser = (email, password, firstname, lastname, lang) => {
    const data = { email, password, firstname, lastname, lang };

    return request(Methods.POST, Endpoints.USER_CREATE, data);
};

export const addAccount = (token, name, consumer_key, consumer_secret, access_token_key, access_token_secret) => {
    const data = { name, consumer_key, consumer_secret, access_token_key, access_token_secret };

    return request(Methods.POST, Endpoints.TWITTERACCOUNT_CREATE, token, data);
};

export const removeAccount = (token, id) => {
    const data = { id };

    return request(Methods.DELETE, Endpoints.TWITTERACCOUNT_DELETE, token, data);
};

export const resetPassword = (email) => {
    const data = { email };

    return request(Methods.DELETE, Endpoints.TWITTERACCOUNT_DELETE, token, data);
};

export const getUserInfos = (token, user) => {
    return requestIfNeeded(Methods.GET, Endpoints.USER_GET, token, {}, Types.USER_FULL, user);
};

export const updateUser = (token, new_email, new_password, new_firstname, new_lastname, new_lang) => {
    const data = { new_email, new_password, new_firstname, new_lastname, new_lang };

    if (!(new_email === null && new_password === null && new_firstname === null && new_lastname === null && new_lang === null))
    {
        return request(Methods.PUT, Endpoints.USER_UPDATE, token, data);
    }
    else
    {
        return Promise.reject(new Error(Errors.ERROR_NO_CHANGES));
    }
};

export const updateAccount = (token, id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret) => {
    const data = { id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret };

    if (!(new_name === null && new_consumer_key === null && new_consumer_secret === null && new_access_token_key === null && new_access_token_secret === null))
    {
        return request(Methods.PUT, Endpoints.TWITTERACCOUNT_UPDATE, token, data);
    }
    else
    {
        return Promise.reject(new Error(Errors.ERROR_NO_CHANGES));
    }
};

export const getAccountList = (token, accounts) => {
    return requestIfNeeded(Methods.GET, Endpoints.ACCOUNT_GET_LIST, token, {}, Types.ACCOUNT_LIST, accounts);
};

export const getTwitterAccount = (token, id) => {
    const data = { id };

    return request(Methods.GET, Endpoints.TWITTERACCOUNT_GET, token, data);
};

export const addCampaign = (token, account_id, name, date_begin, date_end) => {
    const data = { account_id, name, date_begin, date_end };

    return request(Methods.POST, Endpoints.CAMPAIGN_CREATE, token, data);
};

export const removeCampaign = (token, account_id, campaign_id) => {
    const data = { account_id, campaign_id };

    return request(Methods.DELETE, Endpoints.CAMPAIGN_DELETE, token, data);
};

export const updateCampaign = (token, account_id, campaign_id, new_name, new_date_begin, new_date_end) => {
    const data = { account_id, campaign_id, new_name, new_date_begin, new_date_end };

    if (!(new_name === null && new_date_begin === null && new_date_end === null))
    {
        return request(Methods.PUT, Endpoints.CAMPAIGN_UPDATE, token, data);
    }
    else
    {
        return Promise.reject(new Error(Errors.ERROR_NO_CHANGES));
    }
};