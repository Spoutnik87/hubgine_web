import { ENGLISH } from './lang';

export default function getLanguage()
{
    return {
        //---MAIN VALUES---
        LANG: ENGLISH,
        COMPANY_NAME: 'Hubgine',
        //---HEADER---
        HEADER_HOME: 'Home',
        HEADER_ADMIN_DASHBOARD: 'Admin Dashboard',
        HEADER_USER_DASHBOARD: 'User Dashboard',
        HEADER_PROFILE: 'Profile',
        HEADER_DISCONNECT: 'Disconnect',
        HEADER_SIGNIN: 'Sign In',
        HEADER_REGISTER: 'Register',
        //---FOOTER---
        FOOTER_TITLE: '© 2017 Company, Inc. All Rights Reserved.',
        //---SIGNIN---
        SIGNIN_TITLE: 'Sign In',
        SIGNIN_EMAIL: 'Email',
        SIGNIN_PASSWORD: 'Password',
        SIGNIN_FORGOT_PASSWORD: 'Forgot password?',
        SIGNIN_SUBMIT: 'Sign In',
        SIGNIN_EMAIL_INCORRECT: 'Email is not valid.',
        SIGNIN_PASSWORD_INCORRECT: 'Password length must be at least 6 characters.',
        SIGNIN_CREDENTIALS_INCORRECT: 'Your credentials are incorrect. Please try again or reset your password.',
        //---REGISTER---
        REGISTER_TITLE: 'Register',
        REGISTER_SUBMIT: 'Register',
        REGISTER_FIRSTNAME: 'First name',
        REGISTER_LASTNAME: 'Last name',
        REGISTER_EMAIL: 'Email',
        REGISTER_PASSWORD: 'Password',
        REGISTER_CONFIRMPASSWORD: 'Confirm password',
        REGISTER_USETERMS: 'Accept use terms',
        REGISTER_FIRSTNAME_INCORRECT: 'First name field cannot be empty.',
        REGISTER_LASTNAME_INCORRECT: 'Last name field cannot be empty.',
        REGISTER_EMAIL_INCORRECT: 'Email is not valid.',
        REGISTER_PASSWORD_INCORRECT: 'Password length must be at least 6 characters.',
        REGISTER_PASSWORD_NOT_MATCH: 'Your password doesn\'t match.',
        REGISTER_USETERMS_INCORRECT: 'You need to accept the terms of use.',
        REGISTER_ERROR: 'An error happened during the subscription.',
        //---PROFILE---
        PROFILE_PROFILE: 'Profile',
        PROFILE_ACCOUNT_LIST: 'Account list',
        PROFILE_EMAIL: 'Email',
        PROFILE_FIRSTNAME: 'First name',
        PROFILE_LASTNAME: 'Last name'
    }
}