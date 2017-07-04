import { api as config } from "../../client-config.json";

const method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

const useAPI = (method, endpoint, data, callback) => {
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
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
}

export const connect = (email, password, callback) => {
    const data = { email, password };
    
    useAPI(method.GET, "login", data, (error, result) => {
        callback(error, result);
    });
}

export const addUser = (email, password, firstname, lastname, lang, callback) => {
    const data = { email, password, firstname, lastname, lang };
    
    useAPI(method.POST, "create_user", data, (error, result) => {
        if (!error)
        {
            result.email = email;
        }
        callback(error, result);
    });
}

export const addAccount = (email, token, name, consumer_key, consumer_secret, access_token_key, access_token_secret, callback) => {
    const data = { email, token, name, consumer_key, consumer_secret, access_token_key, access_token_secret };

    useAPI(method.POST, "twitter/account", data, (error, result) => {
        callback(error, result);
    });
}

export const removeAccount = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.DELETE, "account", data, (error, result) => {
        callback(error, result);
    });
}

export const resetPassword = (email, callback) => {
    const data = { email };

    useAPI(method.POST, "reset_password", data, (error, result) => {
        callback(error, result);
    });
}

export const getUser = (email, token, callback) => {
    const data  = { email, token };

    useAPI(method.GET, "user", data, (error, result) => {
        callback(error, result);
    });
}

export const getMaxAccounts = (email, token, callback) => {
    const data  = { email, token };

    useAPI(method.GET, "max_accounts", data, (error, result) => {
        callback(error, result);
    });
}

export const updateUser = (email, token, new_email, new_password, new_firstname, new_lastname, new_lang, callback) => {
    const data = { email, token, new_email, new_password, new_firstname, new_lastname, new_lang };

    if (!(new_email === null && new_password === null && new_firstname === null && new_lastname === null && new_lang === null))
    {
        useAPI(method.PUT, "user", data, (error, result) => {
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
        useAPI(method.PUT, "twitter/account", data, (error, result) => {
            callback(error, result);
        });
    }
    else
    {
        callback(null, {});
    }
}

export const getAccountList = (email, token, callback) => {
    const data = { email, token };

    useAPI(method.GET, "account/list", data, (error, result) => {
        callback(error, result);
    });
}

export const getAccountNameList = (email, token, callback) => {
    const data = { email, token };

    useAPI(method.GET, "account/list/name", data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccount = (email, token, id, callback) => {
    const data = { email, token, id };
    
    useAPI(method.GET, "twitter/account", data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountName = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "twitter/account/item/name", data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountKeys = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "twitter/account/item/keys", data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountCampaign = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "twitter/account/item/campaign", data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountBlacklist = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "twitter/account/item/blacklist", data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountCache = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "twitter/account/item/cache", data, (error, result) => {
        callback(error, result);
    });
}

export const getTwitterAccountStats = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "twitter/account/item/stats", data, (error, result) => {
        callback(error, result);
    });
}
