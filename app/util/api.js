import { api as config } from "../../client-config.json";

const method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT"
};

const useAPI = (method, endpoint, data, callback) => {
    let serializedData = "";
    let first = true;
    for (const key in data)
    {
        if (data.hasOwnProperty(key))
        {
            serializedData += ((first ? "?" : "&").toString() + key + "=" + data[key]);
        }
        if (first) first = false;
    }
    const url = config.host + ":" + config.port + "/" + endpoint + serializedData;
    $.ajax({
        type: method,
        url: url,
        contentType: "application/json",
        dataType:"json",
        cache: false,
        success : (result, status) => {
            const error = true ? status === "error" : false;
            callback(error, result);
        },
        error : (result, status) => {
            const error = true ? status === "error" : false;
            callback(error, result);
        }
    });
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

    useAPI(method.POST, "account", data, (error, result) => {
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

export const updateUser = (email, token, field, value, callback) => {
    const data = { email, token, field, value };

    useAPI(method.PUT, "user", data, (error, result) => {
        callback(error, result);
    });
}

export const updateAccount = (email, token, id, field, value, callback) => {
    const data = { email, token, id, field, value };

    useAPI(method.PUT, "account", data, (error, result) => {
        callback(error, result);
    });
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

export const getAccount = (email, token, id, callback) => {
    const data = { email, token, id };
    
    useAPI(method.GET, "account", data, (error, result) => {
        callback(error, result);
    });
}

export const getAccountName = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "account/item/name", data, (error, result) => {
        callback(error, result);
    });
}

export const getAccountKeys = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "account/item/keys", data, (error, result) => {
        callback(error, result);
    });
}

export const getAccountCampaign = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "account/item/campaign", data, (error, result) => {
        callback(error, result);
    });
}

export const getAccountBlacklist = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "account/item/blacklist", data, (error, result) => {
        callback(error, result);
    });
}

export const getAccountCache = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "account/item/cache", data, (error, result) => {
        callback(error, result);
    });
}

export const getAccountStats = (email, token, id, callback) => {
    const data = { email, token, id };

    useAPI(method.GET, "account/item/stats", data, (error, result) => {
        callback(error, result);
    });
}
