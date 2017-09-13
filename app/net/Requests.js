import { api as config } from "../../client-config.json";
import * as Methods from "../constants/RequestMethods";
import * as Endpoints from "../constants/RequestEndpoints";
import * as Types from "../constants/RequestTypes";
import { isCached } from "../util/Metadata";

const request = (method, endpoint, data, callback) => {
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
    const url = config.host + ":" + config.port + "/" + endpoint + serializedData;
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE)
        {
            if (req.status === 200)
            {
                callback(false, JSON.parse(req.responseText));
            }
            else
            {
                callback(true, JSON.parse(req.responseText));
            }
        }
    };
    req.open(method, url, true);
    req.send();
}

export const connect = (email, password, callback) => {
    const data = { email, password };
    
    request(Methods.GET, Endpoints.USER_LOGIN, data, (error, result) => {
        callback(error, result);
    });
}

export const addUser = (email, password, firstname, lastname, lang, callback) => {
    const data = { email, password, firstname, lastname, lang };
    
    request(Methods.POST, Endpoints.USER_CREATE, data, (error, result) => {
        if (!error)
        {
            result.email = email;
        }
        callback(error, result);
    });
}

export const addAccount = (email, token, name, consumer_key, consumer_secret, access_token_key, access_token_secret, callback) => {
    const data = { email, token, name, consumer_key, consumer_secret, access_token_key, access_token_secret };

    request(Methods.POST, Endpoints.TWITTERACCOUNT_CREATE, data, (error, result) => {
        callback(error, result);
    });
}

export const removeAccount = (email, token, id, callback) => {
    const data = { email, token, id };

    request(Methods.DELETE, Endpoints.TWITTERACCOUNT_DELETE, data, (error, result) => {
        callback(error, result);
    });
}

export const resetPassword = (email, callback) => {
    const data = { email };

    request(Methods.POST, Endpoints.USER_RESET_PASSWORD, data, (error, result) => {
        callback(error, result);
    });
}

export const getUser = (email, token, user, callback) => {
    if (user === undefined || (user !== undefined && !isCached(user, Types.USER_NAME)))
    {
        const data = { email, token };
        request(Methods.GET, Endpoints.USER_GET, data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null);
    }
}

export const getMaxAccounts = (email, token, user, callback) => {
    if (user === undefined || (user !== undefined && !isCached(user, Types.USER_MAX_ACCOUNTS)))
    {
        const data  = { email, token };
        request(Methods.GET, Endpoints.USER_GET_MAX_ACCOUNTS, data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null);
    }
};

export const updateUser = (email, token, new_email, new_password, new_firstname, new_lastname, new_lang, callback) => {
    const data = { email, token, new_email, new_password, new_firstname, new_lastname, new_lang };

    if (!(new_email === null && new_password === null && new_firstname === null && new_lastname === null && new_lang === null))
    {
        request(Methods.PUT, Endpoints.USER_UPDATE, data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null, {});
    }
}

export const updateAccount = (email, token, id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret, callback) => {
    const data = { email, token, id, new_name, new_consumer_key, new_consumer_secret, new_access_token_key, new_access_token_secret };

    if (!(new_name === null && new_consumer_key === null && new_consumer_secret === null && new_access_token_key === null && new_access_token_secret === null))
    {
        request(Methods.PUT, Endpoints.TWITTERACCOUNT_UPDATE, data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null, {});
    }
}

export const getAccountList = (email, token, accounts, callback) => {
    if (accounts === undefined || (accounts !== undefined && !isCached(accounts, Types.ACCOUNT_LIST_NAME)))
    {
        const data = { email, token };
        request(Methods.GET, Endpoints.ACCOUNT_GET_LIST, data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null);
    }
}

export const getAccountNameList = (email, token, accounts, callback) => {
    if (accounts === undefined || (accounts !== undefined && !isCached(accounts, Types.ACCOUNT_LIST_NAME)))
    {
        const data = { email, token };
        request(Methods.GET, Endpoints.ACCOUNT_GET_LIST_NAME, data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null);
    }
}

export const getTwitterAccount = (email, token, id, callback) => {
    const data = { email, token, id };
    
    request(Methods.GET, Endpoints.TWITTERACCOUNT_GET, data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountName = (email, token, id, callback) => {
    const data = { email, token, id };

    request(Methods.GET, Endpoints.TWITTERACCOUNT_GET_NAME, data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountKeys = (email, token, id, account, callback) => {
    if (account == undefined || (account !== undefined && !isCached(account, Types.ACCOUNT_KEYS)))
    {
        const data = { email, token, id };
        request(Methods.GET, Endpoints.TWITTERACCOUNT_GET_KEYS, data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null);
    }
}

export const getTwitterAccountCampaign = (email, token, id, callback) => {
    const data = { email, token, id };

    request(Methods.GET, Endpoints.TWITTERACCOUNT_GET_CAMPAIGNS, data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountBlacklist = (email, token, id, callback) => {
    const data = { email, token, id };

    request(Methods.GET, Endpoints.TWITTERACCOUNT_GET_BLACKLIST, data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountCache = (email, token, id, callback) => {
    const data = { email, token, id };

    request(Methods.GET, Endpoints.TWITTERACCOUNT_GET_CACHE, data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountStats = (email, token, id, callback) => {
    const data = { email, token, id };

    request(Methods.GET, Endpoints.TWITTERACCOUNT_GET_STATS, data, (error, result) => {
        callback(error, result);
    });
}

export const addCampaign = (email, token, name, account_id, date_begin, date_end, callback) => {
    const data = { email, token, name, account_id, date_begin, date_end };

    request(Methods.POST, Endpoints.CAMPAIGN_CREATE, data, (error, result) => {
        callback(error, result);
    });
}

export const removeCampaign = (email, token, id, callback) => {
    const data = { email, token, id };

    request(Methods.DELETE, Endpoints.CAMPAIGN_DELETE, data, (error, result) => {
        callback(error, result);
    });
}

export const updateCampaign = (email, token, id, new_name, new_account, new_date_begin, new_date_end, callback) => {
    const data = { email, token, id, new_name, new_account, new_date_begin, new_date_end };

    if (!(new_name === null && new_date_begin === null && new_date_end === null))
    {
        request(Methods.PUT, Endpoints.CAMPAIGN_UPDATE, data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null, {});
    }
}

export const getCampaignList = (email, token, account_id, callback) => {
    const data = { email, token, account_id };

    request(Methods.GET, Endpoints.CAMPAIGN_GET_LIST, data, (error, result) => {
        callback(error, result);
    });
}