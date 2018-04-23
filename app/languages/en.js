import { ENGLISH } from "../constants/Language";

/**
 * Return english locale.
 * @public
 * @returns {Object<string,string>}
 */
const getLanguage = () => {
    return {
        //---MAIN VALUES---
        LANG: ENGLISH,
        LOCALE: "en",
        COMPANY_NAME: "Hubgine",
        GENERIC_ERROR: "An error happened.",
        SESSION_EXPIRED: "Your session has expired.",
        //---HEADER---
        HEADER_HOME: "Home",
        HEADER_ADMIN_DASHBOARD: "Admin Dashboard",
        HEADER_USER_DASHBOARD: "User Dashboard",
        HEADER_PROFILE: "Profile",
        HEADER_DISCONNECT: "Disconnect",
        HEADER_SIGNIN: "Sign In",
        HEADER_REGISTER: "Register",
        HEADER_CONTACT: "Contact us",
        //---FOOTER---
        FOOTER_TITLE: "© 2018 Company, Inc. All Rights Reserved.",
        //---NOTFOUND---
        NOTFOUND_TITLE: "Page Not Found",
        //---SIGNIN---
        SIGNIN_FORGOTPASSWORD: "Forgot password?",
        SIGNIN_EMAIL_INCORRECT: "Email is not valid.",
        SIGNIN_PASSWORD_INCORRECT: "Password length must be at least 6 characters.",
        SIGNIN_CREDENTIALS_INCORRECT: "Your credentials are incorrect. Please try again or reset your password.",
        //---USERSIGNINFORM---
        USERSIGNINFORM_TITLE: "Sign In",
        USERSIGNINFORM_EMAIL: "Email",
        USERSIGNINFORM_PASSWORD: "Password",        
        USERSIGNINFORM_SUBMIT: "Sign In",
        //---REGISTER---
        REGISTER_FIRSTNAME_INCORRECT: "A valid first name is required.",
        REGISTER_LASTNAME_INCORRECT: "A valid last name is required.",
        REGISTER_EMAIL_INCORRECT: "Email is not valid.",
        REGISTER_PASSWORD_INCORRECT: "Password length must be at least 6 characters.",
        REGISTER_PASSWORD_NOT_MATCH: "Your password doesn\"t match.",
        REGISTER_USETERMS_INCORRECT: "You need to accept the terms of use.",
        REGISTER_LANG_INCORRECT: "You need to enter a valid language.",
        REGISTER_ERROR: "An error happened during the subscription.",
        //---USERREGISTERFORM---
        USERREGISTERFORM_TITLE: "Register",
        USERREGISTERFORM_SUBMIT: "Register",
        USERREGISTERFORM_FIRSTNAME: "First name",
        USERREGISTERFORM_LASTNAME: "Last name",
        USERREGISTERFORM_EMAIL: "Email",
        USERREGISTERFORM_PASSWORD: "Password",
        USERREGISTERFORM_CONFIRMPASSWORD: "Confirm password",
        USERREGISTERFORM_LANGUAGE: "Preferred language",
        USERREGISTERFORM_USETERMS: "Accept use terms",
        USERREGISTERFORM_LANGUAGE_ENGLISH: "ENGLISH",
        USERREGISTERFORM_LANGUAGE_FRENCH: "FRANCAIS",
        //---PROFILE---
        PROFILE_TITLE: "Profile",
        PROFILE_ACCOUNT_LIST: "Your accounts",
        PROFILE_EMAIL: "Email",
        PROFILE_FIRSTNAME: "First name",
        PROFILE_LASTNAME: "Last name",
        PROFILE_LANGUAGE: "Preferred language",
        PROFILE_EDIT_PASSWORD: "Edit your password",
        PROFILE_ERROR_GENERIC: "An error happened.",
        PROFILE_ERRORLOADING_USER: "An error happened during user loading.",
        PROFILE_ERRORLOADING_ACCOUNTLIST: "An error happened during account list loading.",
        PROFILE_ERROREDITING_EMAIL: "Email is not valid.",
        PROFILE_SUCCESSEDITING_EMAIL: "You edited your email successfully.",
        PROFILE_ERROREDITING_FIRSTNAME: "The first name field cannot be empty.",
        PROFILE_SUCCESSEDITING_FIRSTNAME: "You edited your first name successfully.",
        PROFILE_ERROREDITING_LASTNAME: "The last name field cannot be empty.",
        PROFILE_SUCCESSEDITING_LASTNAME: "You edited your last name successfully.",
        PROFILE_ERROREDITING_LANGUAGE: "Selected language is incorrect.",
        PROFILE_SUCCESSEDITING_LANGUAGE: "You edited your preferred language successfully.",
        PROFILE_SUCCESSEDITING_PASSWORD: "You edited your preferred password successfully.",
        PROFILE_LANGUAGE_ENGLISH: "ENGLISH",
        PROFILE_LANGUAGE_FRENCH: "FRANCAIS",
        //---ACCOUNTSMANAGMENT---
        ACCOUNTSMANAGMENT_ADD_ACCOUNT: "Add account",
        //---USERDASHBOARD---
        USERDASHBOARD_TITLE: "Your dashboard",
        USERDASHBOARD_ADD_CAMPAIGN: "Add campaign",
        USERDASHBOARD_NO_ACCOUNTS: "You don't have accounts yet. Go to Profile page to create one.",
        USERDASHBOARD_DISPLAY_ACCOUNT_BUTTON: "SHOW",
        //---ADMINDASHBOARD---
        ADMINDASHBOARD_TITLE: "Admin dashboard",
        //---ACCOUNTOVERVIEW---
        ACCOUNTOVERVIEW_NO_ACCOUNT: "This account doesn't exist.",
        ACCOUNTOVERVIEW_EDIT_BUTTON: "Edit this account",
        ACCOUNTOVERVIEW_ADD_CAMPAIGN_BUTTON: "Create a campaign",
        ACCOUNTOVERVIEW_CAMPAIGNS_TITLE: "Campaigns :",
        ACCOUNTOVERVIEW_BLACKLIST_TITLE: "Blacklist :",
        //---CAMPAIGNOVERVIEW---
        CAMPAIGNOVERVIEW_NO_CAMPAIGN: "This campaign doesn't exist.",
        CAMPAIGNOVERVIEW_EDIT_BUTTON: "Edit this campaign",
        CAMPAIGNOVERVIEW_RULES_TITLE: "Rules :",
        CAMPAIGNOVERVIEW_ADD_RULE_BUTTON: "Add a rule",
        CAMPAIGNOVERVIEW_TITLE_ACCOUNT: "Account : ",
        CAMPAIGNOVERVIEW_TITLE_CAMPAIGN: "Campaign : ",
        CAMPAIGNOVERVIEW_NAME: "Name",
        CAMPAIGNOVERVIEW_DATEBEGIN: "Date begin",
        CAMPAIGNOVERVIEW_DATEEND: "Date end",
        //---USERPASSWORDFORM---
        USERPASSWORDFORM_CREATE_TITLE: "Set a new password",
        USERPASSWORDFORM_EDIT_TITLE: "Edit password",
        USERPASSWORDFORM_CREATE_BUTTON: "Confirm",
        USERPASSWORDFORM_EDIT_BUTTON: "Edit",
        USERPASSWORDFORM_CANCEL_BUTTON: "Cancel",
        USERPASSWORDFORM_OLDPASSWORD: "Old password",
        USERPASSWORDFORM_PASSWORD: "New password",
        USERPASSWORDFORM_CPASSWORD: "Confirm new password",
        USERPASSWORDFORM_EDIT_ERROR: "Your old password is not valid",
        //---USERFORGOTPASSWORDFORM---
        USERFORGOTPASSWORDFORM_TITLE: "Reset password",
        USERFORGOTPASSWORDFORM_SUBMIT: "Reset",
        USERFORGOTPASSWORDFORM_EMAIL: "Email",
        //---CONTACTFORM---
        CONTACTFORM_TITLE: "Contact us",
        CONTACTFORM_REASON: "Reason",
        CONTACTFORM_EMAIL: "Email (optional)",
        CONTACTFORM_MESSAGE: "Message",
        CONTACTFORM_SUBMIT: "Send",
        CONTACTFORM_REASON_GENERAL: "General",
        CONTACTFORM_REASON_PROPOSITION: "Proposition",
        CONTACTFORM_REASON_BUG: "Bug/Issue",
        CONTACTFORM_REASON_INFORMATION: "Information",
        CONTACTFORM_REASON_OTHER: "Other",
        //---TWITTERACCOUNTFORM---
        TWITTERACCOUNTFORM_NAME: "Name",
        TWITTERACCOUNTFORM_CONSUMERKEY: "Consumer key",
        TWITTERACCOUNTFORM_CONSUMERSECRET: "Consumer secret",
        TWITTERACCOUNTFORM_ACCESSTOKENKEY: "Access token key",
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET: "Access token secret",
        TWITTERACCOUNTFORM_BLACKLIST: "Word blacklist",
        TWITTERACCOUNTFORM_NAME_INCORRECT: "A valid name is required.",
        TWITTERACCOUNTFORM_NAME_NOT_UNIQUE: "This account name already exist.",
        TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT: "A valid consumer key is required.",
        TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT: "A valid consumer secret is required.",
        TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT: "A valid access token key is required.",
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT: "A valid access token secret required.",
        TWITTERACCOUNTFORM_BLACKLIST_WORD_INCORRECT: " is not a valid word.",
        TWITTERACCOUNTFORM_BLACKLIST_INCORRECT: "A valid word blacklist is required.",
        TWITTERACCOUNTFORM_GENERIC_ERROR: "An error happened.",
        TWITTERACCOUNTFORM_CREATE_SUCCESS: "An account was created successfully.",
        TWITTERACCOUNTFORM_CREATE_TITLE: "Create an account",
        TWITTERACCOUNTFORM_EDIT_TITLE: "Edit an account",
        TWITTERACCOUNTFORM_CREATE_BUTTON: "Create an account",
        TWITTERACCOUNTFORM_EDIT_BUTTON: "Edit this account",
        TWITTERACCOUNTFORM_CANCEL_BUTTON: "Cancel",
        TWITTERACCOUNTFORM_EDIT_SUCCESS: "This account was updated successfully.",
        TWITTERACCOUNTFORM_EDIT_ERROR: "An error happened during account update.",
        TWITTERACCOUNTFORM_DELETE_SUCCESS: "This account was deleted successfully.",
        TWITTERACCOUNTFORM_DELETE_ERROR: "An error happened during account deletion.",
        TWITTERACCOUNTFORM_DELETE_BUTTON: "Delete this account",
        //---CAMPAIGNFORM---
        CAMPAIGNFORM_CREATE_TITLE: "Create a campaign",
        CAMPAIGNFORM_EDIT_TITLE: "Edit a campaign",
        CAMPAIGNFORM_CREATE_BUTTON: "Create a campaign",
        CAMPAIGNFORM_EDIT_BUTTON: "Edit this campaign",
        CAMPAIGNFORM_CANCEL_BUTTON: "Cancel",
        CAMPAIGNFORM_DELETE_BUTTON: "Delete this campaign",
        CAMPAIGNFORM_NAME: "Name",
        CAMPAIGNFORM_ACCOUNT: "Account",
        CAMPAIGNFORM_DATEBEGIN: "Date begin",
        CAMPAIGNFORM_DATEEND: "Date end",
        CAMPAIGNFORM_NAME_TOOLTIP: "Special characters are not allowed.",
        CAMPAIGNFORM_DATEBEGIN_TOOLTIP: "Your campaign will start at this time. Your current timezone is UTC",
        CAMPAIGNFORM_NAME_INCORRECT: "A valid name is required.",
        CAMPAIGNFORM_NAME_NOT_UNIQUE: "This name is already used.",
        CAMPAIGNFORM_ACCOUNT_INCORRECT: "A valid account is required.",
        CAMPAIGNFORM_DATEBEGIN_INCORRECT: "A valid date is required.",
        CAMPAIGNFORM_DATEEND_INCORRECT: "A valid date is required.",
        CAMPAIGNFORM_DATES_INCORRECT: "Dates are invalid.",
        CAMPAIGNFORM_GENERIC_ERROR: "An error happened.",
        CAMPAIGNFORM_CREATE_SUCCESS: "A campaign was created successfully.",
        CAMPAIGNFORM_EDIT_SUCCESS: "This campaign was edited successfully.",
        CAMPAIGNFORM_EDIT_ERROR: "An error happened during campaign update.",
        CAMPAIGNFORM_DELETE_SUCCESS: "This campaign was deleted successfully.",
        CAMPAIGNFORM_DELETE_ERROR: "An error happened during campaign deletion.",
        //---CAMPAIGNLIST---
        CAMPAIGNLIST_NOCAMPAIGN: "There is no campaign yet.",
        //---RULELIST---
        RULELIST_NO_RULES: "There is no rule yet.",
        //---RULEITEM---
        RULEITEM_EDIT_BUTTON: "Edit this rule",
        //---TWITTERRULEFORM---
        TWITTERRULEFORM_CREATE_TITLE: "Create a twitter rule",
        TWITTERRULEFORM_EDIT_TITLE: "Edit a rule",
        TWITTERRULEFORM_CREATE_BUTTON: "Create a rule",
        TWITTERRULEFORM_EDIT_BUTTON: "Edit this rule",
        TWITTERRULEFORM_CANCEL_BUTTON: "Cancel",
        TWITTERRULEFORM_DELETE_BUTTON: "Delete this rule",
        TWITTERRULEFORM_NAME: "Name",
        TWITTERRULEFORM_ACTION: "Action",
        TWITTERRULEFORM_MESSAGES: "Messages",
        TWITTERRULEFORM_CONDITION: "Condition",
        TWITTERRULEFORM_KEYWORDS: "Keywords",
        TWITTERRULEFORM_LANGUAGES: "Languages",
        TWITTERRULEFORM_DELAY: "Delay",
        TWITTERRULEFORM_LANG_TOOLTIP: "If you don't select a language, this filter will be ignored, else tweets will be filtered by selected languages.",
        TWITTERRULEFORM_DELAY_TOOLTIP: "Time between processing two tweets. The minimal value is 60 seconds.",
        TWITTERRULEFORM_AND_SWITCH: "AND",
        TWITTERRULEFORM_OR_SWITCH: "OR",
        TWITTERRULEFORM_TWEET_SWITCH: "TWEET",
        TWITTERRULEFORM_RETWEET_SWITCH: "RETWEET",
        TWITTERRULEFORM_FAVORITE_SWITCH: "FAVORITE",
        //---ARRAYINPUT---
        ARRAYINPUT_ADD_BUTTON: "Add",
        ARRAYINPUT_DELETE_BUTTON: "Remove",
        //---USER---
        USER_EMAIL_INCORRECT: "A valid email is required.",
        USER_EMAIL_NOT_UNIQUE: "A unique email is required.",
        USER_PASSWORD_INCORRECT: "Password length must be at least 6 characters.",
        USER_PASSWORD_NOT_MATCH: "Your password doesn't match.",
        USER_FIRSTNAME_INCORRECT: "A valid firstname is required.",
        USER_LASTNAME_INCORRECT: "A valid lastname is required.",
        USER_LANGUAGE_INCORRECT: "A valid language is required.",
        USER_EDIT_SUCCESS: "Your profile has been updated.",
        //---TWITTERRULE---
        TWITTERRULE_NAME_INCORRECT: "A valid name is required.",
        TWITTERRULE_NAME_NOT_UNIQUE: "This name is already used.",
        TWITTERRULE_ACTION_INCORRECT: "Selected rule type is incorrect.",
        TWITTERRULE_MESSAGE_INCORRECT: " is not a valid message.",
        TWITTERRULE_MESSAGES_INCORRECT: "Message list is not valid.",
        TWITTERRULE_TRACK_INCORRECT: "A keyword list is required.",
        TWITTERRULE_KEYWORD_INCORRECT: " is not a valid keyword.",
        TWITTERRULE_CONDITION_INCORRECT: "Selected condition is incorrect.",
        TWITTERRULE_DELAY_INCORRECT: "A valid delay is required.",
        TWITTERRULE_UNDO_INCORRECT: "A valid undo is required.",
        TWITTERRULE_LANGUAGE_INCORRECT: "Selected language is incorrect.",
        TWITTERRULE_CREATE_SUCCESS: "A rule was created successfully.",
        TWITTERRULE_CREATE_ERROR: "An error happened during rule creation.",
        TWITTERRULE_EDIT_ERROR: "An error happened during rule update.",
        TWITTERRULE_EDIT_SUCCESS: "This rule was edited successfully.",
        TWITTERRULE_DELETE_ERROR: "An error happened during rule deletion.",
        TWITTERRULE_DELETE_SUCCESS: "This rule was deleted successfully.",
        //---TWITTERACCOUNTSTATS---
        TWITTERACCOUNTSTATS_TITLE: "Statistics",
        TWITTERACCOUNTSTATS_NOSTATS: "No statistics currently available.",
        //---TWITTERFOLLOWERSSTATS---
        TWITTERFOLLOWERSSTATS_TITLE: "New followers",
        TWITTERFOLLOWERSSTATS_LASTDAY_PILL: "24 hours",
        TWITTERFOLLOWERSSTATS_LASTWEEK_PILL: "1 week",
        TWITTERFOLLOWERSSTATS_LASTMONTH_PILL: "1 month",
        TWITTERFOLLOWERSSTATS_LASTQUARTER_PILL: "3 months",
        TWITTERFOLLOWERSSTATS_LASTSEMESTER_PILL: "6 months",
        TWITTERFOLLOWERSSTATS_LASTYEAR_PILL: "1 year",
        TWITTERFOLLOWERSSTATS_YLABEL: "New followers",
        TWITTERFOLLOWERSSTATS_LASTRECORD: "Last record: ",
        //---TWITTERACTIONSSTATS---
        TWITTERACTIONSSTATS_TITLE: "Actions",
        TWITTERACTIONSSTATS_LASTDAY_PILL: "24 hours",
        TWITTERACTIONSSTATS_LASTWEEK_PILL: "1 week",
        TWITTERACTIONSSTATS_LASTMONTH_PILL: "1 month",
        TWITTERACTIONSSTATS_LASTQUARTER_PILL: "3 months",
        TWITTERACTIONSSTATS_LASTSEMESTER_PILL: "6 months",
        TWITTERACTIONSSTATS_LASTYEAR_PILL: "1 year",
        TWITTERACTIONSSTATS_ACTIONS_YLABEL: "Actions",
        TWITTERACTIONSSTATS_TWEETS_YLABEL: "Tweets",
        TWITTERACTIONSSTATS_RETWEETS_YLABEL: "Retweets",
        TWITTERACTIONSSTATS_FAVORITES_YLABEL: "Favorites",
        TWITTERACTIONSSTATS_ACTIONS_OPTION: "All",
        TWITTERACTIONSSTATS_TWEETS_OPTION: "Tweets",
        TWITTERACTIONSSTATS_RETWEETS_OPTIONS: "Retweets",
        TWITTERACTIONSSTATS_FAVORITES_OPTIONS: "Favorites",
        TWITTERACTIONSSTATS_LASTRECORD: "Last record: ",
        //---CONTACT---
        CONTACT_ERROR: "An error happened.",
        CONTACT_SUCCESS: "Your message was sent successfully."
    }
}

export default getLanguage;