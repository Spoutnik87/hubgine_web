import { api as config } from "../../client-config.json";
import * as Methods from "../constants/RequestMethods";
import * as Endpoints from "../constants/RequestEndpoints";
import * as Types from "../constants/RequestTypes";
import * as Status from "../constants/RequestStatus";
import { isCached } from "../util/Metadata";

const serializeRequest = (data) => {
    let serializedData = "";
    let first = true;
    for (const key of Object.keys(data))
    {
        if (data[key] !== null)
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
            serializedData += ((first ? "?" : "&").toString() + key + "=" + encodeURIComponent(element));
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
            return Promise.reject(new Error(Status.UNAUTHORIZED));
        }
        else
        {
            return Promise.reject(new Error(Status.WRONG_STATUS));
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
        return Promise.reject(new Error(Status.DATA_CACHED));
    }
};

export const getUser = (email, password, user) => {
    const data = { email, password };

    return requestIfNeeded(Methods.GET, Endpoints.USER_LOGIN, null, data, Types.USER_BASIC, user);
};

export const addUser = (email, password, firstname, lastname, lang) => {
    const data = { email, password, firstname, lastname, lang };

    return request(Methods.POST, Endpoints.USER_CREATE, null, data);
};

export const addAccount = (token, name, consumer_key, consumer_secret, access_token_key, access_token_secret, blacklist) => {
    const data = { name, consumer_key, consumer_secret, access_token_key, access_token_secret, blacklist };

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

export const updateUser = (token, new_email, old_password, new_password, new_firstname, new_lastname, new_lang) => {
    const data = { new_email, old_password, new_password, new_firstname, new_lastname, new_lang };

    if (!(new_email === null && old_password === null && new_password === null && new_firstname === null && new_lastname === null && new_lang === null))
    {
        return request(Methods.PUT, Endpoints.USER_UPDATE, token, data);
    }
    else
    {
        return Promise.reject(new Error(Status.NO_CHANGES));
    }
};

export const updateAccount = (token, id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret, new_blacklist) => {
    const data = { id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret, new_blacklist };

    if (!(new_name == null && new_consumer_key == null && new_consumer_secret == null && new_access_token_key == null && new_access_token_secret == null && new_blacklist == null))
    {
        return request(Methods.PUT, Endpoints.TWITTERACCOUNT_UPDATE, token, data);
    }
    else
    {
        return Promise.reject(new Error(Status.NO_CHANGES));
    }
};

export const getAccountList = (token, accounts) => {
    return requestIfNeeded(Methods.GET, Endpoints.ACCOUNT_GET_LIST, token, {}, Types.ACCOUNT_LIST, accounts);
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

    if (!(new_name == null && new_date_begin == null && new_date_end == null))
    {
        return request(Methods.PUT, Endpoints.CAMPAIGN_UPDATE, token, data);
    }
    else
    {
        return Promise.reject(new Error(Status.NO_CHANGES));
    }
};

export const addTwitterRule = (token, account_id, campaign_id, name, type, messages, track, condition, delay, undo, lang) => {
    const data = { account_id, campaign_id, name, type, messages, track, condition, delay, undo, lang };

    return request(Methods.POST, Endpoints.TWITTERRULE_CREATE, token, data);
};

export const updateTwitterRule = (token, account_id, campaign_id, rule_id, new_name, new_type, new_messages, new_track, new_condition, new_delay, new_undo, new_lang) => {
    const data = { account_id, campaign_id, rule_id, new_name, new_type, new_messages, new_track, new_condition, new_delay, new_undo, new_lang };
    if (!(new_name == null && new_type == null && new_messages == null && new_track == null && new_condition == null && new_delay == null && new_undo == null && new_lang == null))
    {
        return request(Methods.PUT, Endpoints.TWITTERRULE_UPDATE, token, data);
    }
    else
    {
        return Promise.reject(new Error(Status.NO_CHANGES));
    }
};

export const removeTwitterRule = (token, account_id, campaign_id, rule_id) => {
    const data = { account_id, campaign_id, rule_id };

    return request(Methods.DELETE, Endpoints.TWITTERRULE_DELETE, token, data);
};