class Auth {

    static connectUser(token)
    {
        localStorage.setItem('token', token);
    }

    static isUserConnected()
    {
        return localStorage.getItem('token') != null;
    }

    static disconnectUser()
    {
        localStorage.removeItem('token');
    }

    static isUserAdministrator()
    {
        return localStorage.getItem('rank') === 'administrator';
    }

    static getToken()
    {
        return localStorage.getItem('token');
    }

    static getRank()
    {
        return localStorage.getItem('rank');
    }
}

export default Auth;