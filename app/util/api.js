function botAPI() {
    this.user_email = "null";
    this.user_password = "null";
    this.user_tocken = "null";
}

botAPI.prototype.useAPI = function(method, search, get, callback) {
    const url = "http://www.flavien.cc:8000/api/"+search

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callback(JSON.parse(xhttp.responseText));
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            callback(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open(method, url+get, true);
    xhttp.send(JSON.stringify());
}

botAPI.prototype.addUser = function(lastname, firstname, email, password, consumer_key, consumer_secret, access_token_key, access_token_secret, callback) {
    const get =
        "?lastname="+lastname+
        "&firstname="+firstname+
        "&email="+email+
        "&password="+password+
        "&consumer_key="+consumer_key+
        "&consumer_secret="+consumer_secret+
        "&access_token_key="+access_token_key+
        "&access_token_secret="+access_token_secret;

    this.useAPI("POST", "user/add", get, (result) => {
        if(result.token) {
            this.user_email = email;
            this.user_password = password;
            this.user_tocken = result.token;
        }

        callback(result);
    });
}

botAPI.prototype.connect = function(email, password, callback) {
    const get =
        "?email="+email+
        "&password="+password;

    this.useAPI("GET", "user/connect", get, (result) => {
        if(result.token) {
            this.user_email = email;
            this.user_password = password;
            this.user_tocken = result.token;
        }

        callback(result);
    });
}

botAPI.prototype.selectBlacklist = function(callback) {
    if(this.user_email && this.user_password && this.user_tocken) {
        let get = "?email="+this.user_email+
        "&token="+this.user_tocken;

        this.useAPI("GET", "api/blacklist", get, (result) => {
            callback(result);
        });
    }
    else {
        console.log("wrong informations");
    }
}

botAPI.prototype.addBlacklist = function(word, callback) {
    if(this.user_email && this.user_password && this.user_tocken) {
        let get = "?email="+this.user_email+
        "&token="+this.user_tocken+
        "&word="+word;

        this.useAPI("POST", "api/blacklist", get, (result) => {
            callback(result);
        });
    }
    else {
        console.log("wrong informations");
    }
}

botAPI.prototype.deleteBlacklist = function(word, callback) {
    if(this.user_email && this.user_password && this.user_tocken) {
        let get = "?email="+this.user_email+
        "&token="+this.user_tocken+
        "&word="+word;

        this.useAPI("DELETE", "api/blacklist", get, (result) => {
            callback(result);
        });
    }
    else {
        console.log("wrong informations");
    }
}

module.exports = botAPI;