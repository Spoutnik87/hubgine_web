function botAPI() {
    this.domain = "flavien.cc";
	this.port = 8001;

    this.user_email = null;
    this.user_password = null;
    this.user_tocken = null;
}

botAPI.prototype.useAPI = function(method, search, send, callback) {
    const url = "http://"+this.domain+":"+this.port+"/"+search+"?"+send;

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

botAPI.prototype.addUser = function(email, password, firstname, lastname, callback) {
    const send =
        "email="+email+
        "&password="+password+
        "&firstname="+firstname+
        "&lastname="+lastname;


    this.useAPI("POST", "create_user", send, (result) => {
        if(result.token) {
            this.user_email = email;
            this.user_password = password;
            this.user_tocken = result.token;
        }

        callback(result);
    });
}

botAPI.prototype.connect = function(email, password, callback) {
    const send =
        "email="+email+
        "&password="+password;

    this.useAPI("GET", "login", send, (result) => {
        if(result.token) {
            this.user_email = email;
            this.user_password = password;
            this.user_tocken = result.token;
        }

        callback(result);
    });
}

botAPI.prototype.addAccount = function(consumer_key, cunsumer_secret, access_token_key, access_token_secret, callback) {
    const send =
        "email="+this.user_email+
        "&token="+this.user_tocken+
        "&consumer_key="+consumer_key+
        "&consumer_secret="+cunsumer_secret+
        "&access_token_key="+access_token_key+
        "&access_token_secret="+access_token_secret;
    
    this.useAPI("post", "account", send, (result) => {
        callback(result);
    });
}