const useAPI = (method, search, send, callback) =>
{
    const domain = "flavien.cc";
    const port = 8001;
    const url = "http://"+domain+":"+port+"/"+search+"?"+send;
    $.ajax({
        type: method,
        url: url,
        contentType: 'application/json',
        dataType:'json',
        cache: false,
        success : (result, status) => {
            const error = true ? status === "error" : false;
            callback(error, result);
        },
        error : (result, status) => {
            console.log(result);
            console.log(status);
            const error = true ? status === "error" : false;
            callback(error, result);
        }
    });
}

export const connect = (email, password, callback) =>
{
    const send =
        "email="+email+
        "&password="+password;

    useAPI("GET", "login", send, (error, result) =>
    {
        callback(error, result);
    });
}

export const addUser = (email, password, firstname, lastname, lang, callback) =>
{
    const send =
        "email="+email+
        "&password="+password+
        "&firstname="+firstname+
        "&lastname="+lastname+
        "&lang="+lang;

    useAPI("POST", "create_user", send, (error, result) =>
    {
        if (!error)
        {
            result.email = email;
        }
        callback(error, result);
    });
}

export const addAccount = (user_email, user_token, consumer_key, cunsumer_secret, access_token_key, access_token_secret, callback) =>
{
    const send =
        "email="+user_email+
        "&token="+user_token+
        "&consumer_key="+consumer_key+
        "&consumer_secret="+cunsumer_secret+
        "&access_token_key="+access_token_key+
        "&access_token_secret="+access_token_secret;
    
    useAPI("post", "account", send, (error, result) =>
    {
        callback(error, result);
    });
}

export const getAccount = (user_email, user_token, callback) =>
{
    const send =
        "email="+user_email+
        "&token="+user_token;
    
    useAPI("GET", "account", send, (error, result) =>
    {
        callback(error, result);
    });
}

export const getAccountList = (user_email, user_token, callback) =>
{
    const send =
        "email="+user_email+
        "&token="+user_token;

    useAPI("GET", "account/list", send, (error, result) =>
    {
        callback(error, result);
    });
}

export const resetPassword = (email, callback) =>
{
    const send = "email=" + email;

    useAPI("POST", "reset_password", send, (error, result) =>
    {
        callback(error, result);
    });
}

export const getUser = (user_email, user_token, callback) =>
{
    const send = 
        "email="+user_email+
        "&token="+user_token;
    
    useAPI("GET", "user", send, (error, result) =>
    {
        callback(error, result);
    });
}

export const updateUser = (user_email, user_token, field, value, callback) =>
{
    const send =
        "email="+user_email+
        "&token="+user_token+
        "&field="+field+
        "&value="+value

    useAPI("PUT", "user", send, (error, result) =>
    {
        callback(error, result);
    });
}