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
        success : (result, statut) => {
            callback(result);
        },
        error : (result, statut, erreur) => {
            callback(result);
        }
    });
}

export const connect = (email, password, callback) =>
{
    const send =
        "email="+email+
        "&password="+password;

    useAPI("GET", "login", send, (result) =>
    {
        callback(result);
    });
}

export const addUser = (email, password, firstname, lastname, callback) =>
{
    const send =
        "email="+email+
        "&password="+password+
        "&firstname="+firstname+
        "&lastname="+lastname;

    useAPI("POST", "create_user", send, (result) =>
    {
        callback(result);
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
    
    useAPI("post", "account", send, (result) =>
    {
        callback(result);
    });
}