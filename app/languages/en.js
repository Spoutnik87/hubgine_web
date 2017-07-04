import { ENGLISH } from "../constants/Languages";

export default function getLanguage()
{
    return {
        //---MAIN VALUES---
        LANG: ENGLISH,
        COMPANY_NAME: "Hubgine",
        //---HEADER---
        HEADER_SR_ONLY: "Toggle navigation",
        HEADER_HOME: "Home",
        HEADER_ADMIN_DASHBOARD: "Admin Dashboard",
        HEADER_USER_DASHBOARD: "User Dashboard",
        HEADER_PROFILE: "Profile",
        HEADER_DISCONNECT: "Disconnect",
        HEADER_SIGNIN: "Sign In",
        HEADER_REGISTER: "Register",
        //---FOOTER---
        FOOTER_TITLE: "© 2017 Company, Inc. All Rights Reserved.",
        //---NOTFOUND---
        NOTFOUND_TITLE: "Page Not Found",
        //---SIGNIN---
        SIGNIN_TITLE: "Sign In",
        SIGNIN_EMAIL: "Email",
        SIGNIN_PASSWORD: "Password",
        SIGNIN_FORGOTPASSWORD: "Forgot password?",
        SIGNIN_SUBMIT: "Sign In",
        SIGNIN_EMAIL_INCORRECT: "Email is not valid.",
        SIGNIN_PASSWORD_INCORRECT: "Password length must be at least 6 characters.",
        SIGNIN_CREDENTIALS_INCORRECT: "Your credentials are incorrect. Please try again or reset your password.",
        //---REGISTER---
        REGISTER_TITLE: "Register",
        REGISTER_SUBMIT: "Register",
        REGISTER_FIRSTNAME: "First name",
        REGISTER_LASTNAME: "Last name",
        REGISTER_EMAIL: "Email",
        REGISTER_PASSWORD: "Password",
        REGISTER_CONFIRMPASSWORD: "Confirm password",
        REGISTER_USETERMS: "Accept use terms",
        REGISTER_FIRSTNAME_INCORRECT: "First name field cannot be empty.",
        REGISTER_LASTNAME_INCORRECT: "Last name field cannot be empty.",
        REGISTER_EMAIL_INCORRECT: "Email is not valid.",
        REGISTER_PASSWORD_INCORRECT: "Password length must be at least 6 characters.",
        REGISTER_PASSWORD_NOT_MATCH: "Your password doesn\"t match.",
        REGISTER_USETERMS_INCORRECT: "You need to accept the terms of use.",
        REGISTER_ERROR: "An error happened during the subscription.",
        //---PROFILE---
        PROFILE_TITLE: "Profile",
        PROFILE_ACCOUNT_LIST: "Your accounts",
        PROFILE_EMAIL: "Email",
        PROFILE_FIRSTNAME: "First name",
        PROFILE_LASTNAME: "Last name",
        PROFILE_ERROR_GENERIC: "An error happened.",
        PROFILE_ERRORLOADING_USER: "An error happened during user loading.",
        PROFILE_ERRORLOADING_ACCOUNTLIST: "An error happened during account list loading.",
        PROFILE_ERROREDITING_EMAIL: "Email is not valid.",
        PROFILE_SUCCESSEDITING_EMAIL: "You edited your email successfully.",
        PROFILE_ERROREDITING_FIRSTNAME: "The first name field cannot be empty.",
        PROFILE_SUCCESSEDITING_FIRSTNAME: "You edited your first name successfully.",
        PROFILE_ERROREDITING_LASTNAME: "The last name field cannot be empty.",
        PROFILE_SUCCESSEDITING_LASTNAME: "You edited your last name successfully.",
        //---FORGOTPASSWORD---
        FORGOTPASSWORD_TITLE: "Reset password",
        FORGOTPASSWORD_SUBMIT: "Reset password",
        FORGOTPASSWORD_EMAIL: "Email",
        //---ACCOUNTTILE---
        ACCOUNTTILE_NAME: "Name : ",
        //---TWITTERACCOUNTFORM---
        TWITTERACCOUNTFORM_NAME: "Name",
        TWITTERACCOUNTFORM_CONSUMERKEY: "Consumer key",
        TWITTERACCOUNTFORM_CONSUMERSECRET: "Consumer secret",
        TWITTERACCOUNTFORM_ACCESSTOKENKEY: "Access token key",
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET: "Access token secret",
        TWITTERACCOUNTFORM_NAME_INCORRECT: "A valid name is required.",
        TWITTERACCOUNTFORM_NAME_NOT_UNIQUE: "This account name already exist.",
        TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT: "A valid consumer key is required.",
        TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT: "A valid consumer secret is required.",
        TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT: "A valid access token key is required.",
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT: "A valid access token secret required.",
        TWITTERACCOUNTFORM_GENERIC_ERROR: "An error happened.",
        //---TWITTERACCOUNTCREATEFORM---
        TWITTERACCOUNTCREATEFORM_SUCCESS: "An account was created successfully.",
        TWITTERACCOUNTCREATEFORM_TITLE: "Create an account",
        //---TWITTERACCOUNTEDITFORM---
        TWITTERACCOUNTEDITFORM_EDIT_SUCCESS: "This account was updated successfully.",
        TWITTERACCOUNTEDITFORM_EDIT_ERROR: "An error happened during account update.",
        TWITTERACCOUNTEDITFORM_DELETE_SUCCESS: "This account was deleted successfully.",
        TWITTERACCOUNTEDITFORM_DELETE_ERROR: "An error happened during account deletion.",
        TWITTERACCOUNTEDITFORM_DELETE_BUTTON: "Delete this account"
    }
}