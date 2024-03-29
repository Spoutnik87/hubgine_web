import { FRENCH } from "../constants/Language";

/**
 * Return french locale.
 * @public
 * @returns {Object<string,string>}
 */
const getLanguage = () => {
    return {
        //---MAIN VALUES---
        LANG: FRENCH,
        LOCALE: "fr",
        COMPANY_NAME: "Hubgine",
        GENERIC_ERROR: "Une erreur est survenue.",
        SESSION_EXPIRED: "La session a expirée.",
        //---HEADER---
        HEADER_HOME: "Home",
        HEADER_ADMIN_DASHBOARD: "Tableau de bord de l'admin",
        HEADER_USER_DASHBOARD: "Tableau de bord",
        HEADER_PROFILE: "Profil",
        HEADER_DISCONNECT: "Se deconnecter",
        HEADER_SIGNIN: "Se connecter",
        HEADER_REGISTER: "S'inscrire",
        HEADER_CONTACT: "Nous contacter",
        //---FOOTER---
        FOOTER_TITLE: "© 2018 Hubgine. Tous droits résérvés.",
        //---NOTFOUND---
        NOTFOUND_TITLE: "Page introuvable",
        //---SIGNIN---
        SIGNIN_FORGOTPASSWORD: "Mot de passe oublié ?",
        SIGNIN_EMAIL_INCORRECT: "L'adresse email est invalide.",
        SIGNIN_PASSWORD_INCORRECT: "Le mot de passe doit avoir une longueur minimale de 6 caractères.",
        SIGNIN_CREDENTIALS_INCORRECT: "Vos identifiants sont incorrects. Reessayez ou changez votre mot de passe.",
        //---USERSIGNINFORM---
        USERSIGNINFORM_TITLE: "Se connecter",
        USERSIGNINFORM_EMAIL: "Email",
        USERSIGNINFORM_PASSWORD: "Mot de passe",
        USERSIGNINFORM_SUBMIT: "Se connecter",
        //---REGISTER---
        REGISTER_FIRSTNAME_INCORRECT: "Vous devez saisir un prénom valide.",
        REGISTER_LASTNAME_INCORRECT: "Vous devez saisir un nom valide.",
        REGISTER_EMAIL_INCORRECT: "L'adresse email est invalide.",
        REGISTER_PASSWORD_INCORRECT: "Le mot de passe doit avoir une longueur minimale de 6 caractères.",
        REGISTER_PASSWORD_NOT_MATCH: "Les mots de passe ne sont pas identiques.",
        REGISTER_USETERMS_INCORRECT: "Vous devez accepter les conditions d'utilisations.",
        REGISTER_LANG_INCORRECT: "Vous devez rentrer une langue valide.",
        REGISTER_ERROR: "Une erreur est survenue lors de l'inscription.",
        //---USERREGISTERFORM---
        USERREGISTERFORM_TITLE: "Inscription",
        USERREGISTERFORM_SUBMIT: "S'inscrire",
        USERREGISTERFORM_FIRSTNAME: "Prénom",
        USERREGISTERFORM_LASTNAME: "Nom",
        USERREGISTERFORM_EMAIL: "Email",
        USERREGISTERFORM_PASSWORD: "Mot de passe",
        USERREGISTERFORM_CONFIRMPASSWORD: "Confirmation du mot de passe",
        USERREGISTERFORM_LANGUAGE: "Langue préférée",
        USERREGISTERFORM_USETERMS: "Accepter les conditions d'utilisations",
        USERREGISTERFORM_LANGUAGE_ENGLISH: "ENGLISH",
        USERREGISTERFORM_LANGUAGE_FRENCH: "FRANCAIS",
        //---PROFILE---
        PROFILE_TITLE: "Profil",
        PROFILE_ACCOUNT_LIST: "Vos comptes",
        PROFILE_EMAIL: "Email",
        PROFILE_FIRSTNAME: "Prénom",
        PROFILE_LASTNAME: "Nom",
        PROFILE_LANGUAGE: "Langue préférée",
        PROFILE_EDIT_PASSWORD: "Changer le mot de passe",
        PROFILE_ERROR_GENERIC: "Une erreur est survenue.",
        PROFILE_ERRORLOADING_USER: "Une erreur est survenue lors du chargement de l'utilisateur.",
        PROFILE_ERRORLOADING_ACCOUNTLIST: "Une erreur est survenue lors du chargement de la liste des comptes.",
        PROFILE_ERROREDITING_EMAIL: "L'adresse email est invalide.",
        PROFILE_SUCCESSEDITING_EMAIL: "Adresse email éditée avec succès.",
        PROFILE_ERROREDITING_FIRSTNAME: "Le champ prenom ne doit pas être vide.",
        PROFILE_SUCCESSEDITING_FIRSTNAME: "Prenom édité avec succès.",
        PROFILE_ERROREDITING_LASTNAME: "Le champ nom ne doit pas être vide.",
        PROFILE_SUCCESSEDITING_LASTNAME: "Nom édité avec succès.",
        PROFILE_ERROREDITING_LANGUAGE: "La langue selectionné est incorrecte.",
        PROFILE_SUCCESSEDITING_LANGUAGE: "La langue a été éditée avec succès.",
        PROFILE_SUCCESSEDITING_LANGUAGE: "Le mot de passe a été édité avec succès.",
        PROFILE_LANGUAGE_ENGLISH: "ENGLISH",
        PROFILE_LANGUAGE_FRENCH: "FRANCAIS",
        //---ACCOUNTSMANAGMENT---
        ACCOUNTSMANAGMENT_ADD_ACCOUNT: "Ajouter un compte",
        //---ADMINDASHBOARD---
        ADMINDASHBOARD_TITLE: "Tableau de bord de l'administrateur",
        //---USERDASHBOARD---
        USERDASHBOARD_TITLE: "Votre tableau de bord",
        USERDASHBOARD_ADD_CAMPAIGN: "Ajouter une campagne",
        USERDASHBOARD_NO_ACCOUNTS: "Vous n'avez pas de compte actuellement. Vous pouvez en créer à partir de votre page Profil.",
        USERDASHBOARD_DISPLAY_ACCOUNT_BUTTON: "VOIR",
        //---ACCOUNTOVERVIEW---
        ACCOUNTOVERVIEW_NO_ACCOUNT: "Ce compte n'existe pas.",
        ACCOUNTOVERVIEW_EDIT_BUTTON: "Modifier ce compte",
        ACCOUNTOVERVIEW_ADD_CAMPAIGN_BUTTON: "Créer une campagne",
        ACCOUNTOVERVIEW_CAMPAIGNS_TITLE: "Les campagnes :",
        ACCOUNTOVERVIEW_BLACKLIST_TITLE: "La liste noire de mots :",
        //---CAMPAIGNOVERVIEW---
        CAMPAIGNOVERVIEW_NO_CAMPAIGN: "Cette campagne n'existe pas.",
        CAMPAIGNOVERVIEW_EDIT_BUTTON: "Modifier cette campagne",
        CAMPAIGNOVERVIEW_RULES_TITLE: "Les règles :",
        CAMPAIGNOVERVIEW_ADD_RULE_BUTTON: "Ajouter une règle",
        CAMPAIGNOVERVIEW_ACCOUNTNAME: "Compte",
        CAMPAIGNOVERVIEW_NAME: "Nom",
        CAMPAIGNOVERVIEW_DATEBEGIN: "Date de début",
        CAMPAIGNOVERVIEW_DATEEND: "Date de fin",
        CAMPAIGNOVERVIEW_DISPLAY_ACCOUNT_BUTTON: "Voir le compte",
        //---USERPASSWORDFORM---
        USERPASSWORDFORM_CREATE_TITLE: "Définir un nouveau mot de passe",
        USERPASSWORDFORM_EDIT_TITLE: "Changer de mot de passe",
        USERPASSWORDFORM_CREATE_BUTTON: "Confirmer",
        USERPASSWORDFORM_EDIT_BUTTON: "Editer",
        USERPASSWORDFORM_CANCEL_BUTTON: "Annuler",
        USERPASSWORDFORM_OLDPASSWORD: "Ancien mot de passe",
        USERPASSWORDFORM_PASSWORD: "Nouveau mot de passe",
        USERPASSWORDFORM_CPASSWORD: "Confirmation du nouveau mot de passe",
        USERPASSWORDFORM_EDIT_ERROR: "L'ancien mot de passe est invalide",
        //---USERFORGOTPASSWORDFORM---
        USERFORGOTPASSWORDFORM_TITLE: "Réinitialiser le mot de passe",
        USERFORGOTPASSWORDFORM_SUBMIT: "Réinitialiser",
        USERFORGOTPASSWORDFORM_EMAIL: "Email",
        //---CONTACTFORM---
        CONTACTFORM_TITLE: "Nous contacter",
        CONTACTFORM_REASON: "Motif",
        CONTACTFORM_EMAIL: "Email (optionnel)",
        CONTACTFORM_MESSAGE: "Message",
        CONTACTFORM_SUBMIT: "Envoyer",
        CONTACTFORM_REASON_GENERAL: "General",
        CONTACTFORM_REASON_PROPOSITION: "Proposition",
        CONTACTFORM_REASON_BUG: "Erreur/bug",
        CONTACTFORM_REASON_INFORMATION: "Information",
        CONTACTFORM_REASON_OTHER: "Autre",
        //---TWITTERACCOUNTFORM---
        TWITTERACCOUNTFORM_NAME: "Nom",
        TWITTERACCOUNTFORM_CONSUMERKEY: "Consumer key",
        TWITTERACCOUNTFORM_CONSUMERSECRET: "Consumer secret",
        TWITTERACCOUNTFORM_ACCESSTOKENKEY: "Access token key",
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET: "Access token secret",
        TWITTERACCOUNTFORM_BLACKLIST: "Liste noire de mots",
        TWITTERACCOUNTFORM_NAME_INCORRECT: "Un nom valide est requis.",
        TWITTERACCOUNTFORM_NAME_NOT_UNIQUE: "Ce nom existe déjà.",
        TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT: "Votre \"consumer key\" est invalide.",
        TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT: "Votre \"consumer secret\" est invalide.",
        TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT: "Votre \"access token key\" est invalide.",
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT: "Votre \"access token secret\" est invalide.",
        TWITTERACCOUNTFORM_BLACKLIST_WORD_INCORRECT: " n'est pas un mot valide.",
        TWITTERACCOUNTFORM_BLACKLIST_INCORRECT: "Votre liste noire de mots est invalide.",
        TWITTERACCOUNTFORM_GENERIC_ERROR: "Une erreur est survenue.",
        TWITTERACCOUNTFORM_CREATE_SUCCESS: "Un compte a été créé avec succès.",
        TWITTERACCOUNTFORM_CREATE_TITLE: "Créer un compte",
        TWITTERACCOUNTFORM_EDIT_TITLE: "Editer un compte",
        TWITTERACCOUNTFORM_CREATE_BUTTON: "Créer un compte",
        TWITTERACCOUNTFORM_EDIT_BUTTON: "Editer un compte",
        TWITTERACCOUNTFORM_CANCEL_BUTTON: "Annuler",
        TWITTERACCOUNTFORM_EDIT_SUCCESS: "Ce compte a été mis à jour.",
        TWITTERACCOUNTFORM_EDIT_ERROR: "Une erreur est survenue lors de la mise à jour du compte.",
        TWITTERACCOUNTFORM_DELETE_SUCCESS: "Ce compte a été supprimé avec succès.",
        TWITTERACCOUNTFORM_DELETE_ERROR: "Une errreur est survenue lors de la suppression du compte.",
        TWITTERACCOUNTFORM_DELETE_BUTTON: "Supprimer un compte",
        //---CAMPAIGNFORM---
        CAMPAIGNFORM_CREATE_TITLE: "Créer une campagne",
        CAMPAIGNFORM_EDIT_TITLE: "Editer une campagne",
        CAMPAIGNFORM_CREATE_BUTTON: "Créer une campagne",
        CAMPAIGNFORM_EDIT_BUTTON: "Editer la campagne",
        CAMPAIGNFORM_CANCEL_BUTTON: "Annuler",
        CAMPAIGNFORM_DELETE_BUTTON: "Supprimer la campagne",
        CAMPAIGNFORM_NAME: "Nom",
        CAMPAIGNFORM_ACCOUNT: "Compte",
        CAMPAIGNFORM_DATEBEGIN: "Date de début",
        CAMPAIGNFORM_DATEEND: "Date de fin",
        CAMPAIGNFORM_NAME_TOOLTIP: "Les caractères spéciaux ne sont pas autorisés.",
        CAMPAIGNFORM_DATEBEGIN_TOOLTIP: "La campagne va démarrer a cette heure. Votre fuseau horaire est UTC",
        CAMPAIGNFORM_NAME_INCORRECT: "Un nom valide est requis.",
        CAMPAIGNFORM_NAME_NOT_UNIQUE: "Ce nom est déjà utilisé.",
        CAMPAIGNFORM_ACCOUNT_INCORRECT: "Un compte valide est requis.",
        CAMPAIGNFORM_DATEBEGIN_INCORRECT: "Une date valide est requise.",
        CAMPAIGNFORM_DATEEND_INCORRECT: "Une date valide est requise.",
        CAMPAIGNFORM_DATES_INCORRECT: "Les dates sont invalides.",
        CAMPAIGNFORM_GENERIC_ERROR: "Une erreur est survenue.",
        CAMPAIGNFORM_CREATE_SUCCESS: "Une campagne a été créée avec succès.",
        CAMPAIGNFORM_EDIT_SUCCESS: "Cette campagne a été mise à jour.",
        CAMPAIGNFORM_EDIT_ERROR: "Une erreur est survenue lors de la mise à jour de la campagne.",
        CAMPAIGNFORM_DELETE_SUCCESS: "Cette campagne a été supprimée avec succès.",
        CAMPAIGNFORM_DELETE_ERROR: "Une erreur est survenue lors de la suppression de la campagne.",
        //---CAMPAIGNLIST---
        CAMPAIGNLIST_NOCAMPAIGN: "Il n'y a pas de campagnes actuellement.",
        //---CAMPAIGNITEM---
        CAMPAIGNITEM_RUNNING: "En cours d'exécution",
        CAMPAIGNITEM_NOTRUNNING: "N'est pas exécuté",
        //---RULELIST---
        RULELIST_NO_RULES: "Il n'y a pas de règles actuellement.",
        //---RULEITEM---
        RULEITEM_EDIT_BUTTON: "Editer cette règle",
        //---TWITTERRULEFORM---
        TWITTERRULEFORM_CREATE_TITLE: "Créer une règle twitter",
        TWITTERRULEFORM_EDIT_TITLE: "Editer une règle",
        TWITTERRULEFORM_CREATE_BUTTON: "Créer une règle",
        TWITTERRULEFORM_EDIT_BUTTON: "Editer la règle",
        TWITTERRULEFORM_CANCEL_BUTTON: "Annuler",
        TWITTERRULEFORM_DELETE_BUTTON: "Supprimer la règle",
        TWITTERRULEFORM_NAME: "Nom",
        TWITTERRULEFORM_ACTION: "Action",
        TWITTERRULEFORM_MESSAGES: "Messages",
        TWITTERRULEFORM_CONDITION: "Condition",
        TWITTERRULEFORM_KEYWORDS: "Mots-clés",
        TWITTERRULEFORM_LANGUAGES: "Langages",
        TWITTERRULEFORM_DELAY: "Délai",
        TWITTERRULEFORM_LANG_TOOLTIP: "Si vous ne selectionnez pas de langage, ce filtre sera ignoré, dans le cas contraire les tweets seront filtrés en fonction des langues selectionnées.",
        TWITTERRULEFORM_DELAY_TOOLTIP: "Temps entre le traitement de deux tweets. Le valeur minimale est de 60 secondes.",
        TWITTERRULEFORM_AND_SWITCH: "ET",
        TWITTERRULEFORM_OR_SWITCH: "OU",
        TWITTERRULEFORM_TWEET_SWITCH: "TWEET",
        TWITTERRULEFORM_RETWEET_SWITCH: "RETWEET",
        TWITTERRULEFORM_FAVORITE_SWITCH: "FAVORIS",
        //---ARRAYINPUT---
        ARRAYINPUT_ADD_BUTTON: "Ajouter",
        ARRAYINPUT_DELETE_BUTTON: "Supprimer",
        //---USER---
        USER_EMAIL_INCORRECT: "L'adresse mail est incorrecte.",
        USER_EMAIL_NOT_UNIQUE: "L'adresse mail est déjà utilisée.",
        USER_PASSWORD_INCORRECT: "Le mot de passe doit avoir une longueur minimale de 6 caractères.",
        USER_PASSWORD_NOT_MATCH: "Les mots de passe ne sont pas identiques.",
        USER_FIRSTNAME_INCORRECT: "Le prénom est invalide.",
        USER_LASTNAME_INCORRECT: "Le nom est invalide.",
        USER_LANGUAGE_INCORRECT: "Une langue valide est requise.",
        USER_EDIT_SUCCESS: "Votre profil a été mis à jour.",
        //---TWITTERRULE---
        TWITTERRULE_NAME_INCORRECT: "Un nom valide est requis.",
        TWITTERRULE_NAME_NOT_UNIQUE: "Ce nom est déjà utilisé.",
        TWITTERRULE_ACTION_INCORRECT: "Une action valide est requise.",
        TWITTERRULE_MESSAGE_INCORRECT: " n'est pas un message valide.",
        TWITTERRULE_MESSAGES_INCORRECT: "La liste des messages n'est pas valide.",
        TWITTERRULE_TRACK_INCORRECT: "Une liste de mots clés valides est requise.",
        TWITTERRULE_KEYWORD_INCORRECT: " n'est pas un mot clé valide.",
        TWITTERRULE_CONDITION_INCORRECT: "Une condition valide est requise.",
        TWITTERRULE_DELAY_INCORRECT: "Un délai valide est requis.",
        TWITTERRULE_UNDO_INCORRECT: "Une date d'annulation valide est requise.",
        TWITTERRULE_LANGUAGE_INCORRECT: "Une langue valide est requise.",
        TWITTERRULE_CREATE_SUCCESS: "Une règle a été créée avec succès.",
        TWITTERRULE_CREATE_ERROR: "Une erreur est survenue lors de la creation de la règle.",
        TWITTERRULE_EDIT_ERROR: "Une erreur est survenue lors de la mise à jour de la règle.",
        TWITTERRULE_EDIT_SUCCESS: "Cette règle a été mise à jour.",
        TWITTERRULE_DELETE_ERROR: "Une erreur est survenue lors de la suppression de la règle.",
        TWITTERRULE_DELETE_SUCCESS: "Cette règle a été supprimée avec succès.",
        //---TWITTERACCOUNTSTATS---
        TWITTERACCOUNTSTATS_TITLE: "Statistiques",
        TWITTERACCOUNTSTATS_NOSTATS: "Les statistiques ne sont pas disponibles actuellement.",
        //---TWITTERFOLLOWERSSTATS---
        TWITTERFOLLOWERSSTATS_TITLE: "Nouveaux abonnés",
        TWITTERFOLLOWERSSTATS_LASTDAY_PILL: "24 heures",
        TWITTERFOLLOWERSSTATS_LASTWEEK_PILL: "7 jours",
        TWITTERFOLLOWERSSTATS_LASTMONTH_PILL: "1 mois",
        TWITTERFOLLOWERSSTATS_LASTQUARTER_PILL: "3 mois",
        TWITTERFOLLOWERSSTATS_LASTSEMESTER_PILL: "6 mois",
        TWITTERFOLLOWERSSTATS_LASTYEAR_PILL: "1 année",
        TWITTERFOLLOWERSSTATS_YLABEL: "Nouveaux abonnés",
        TWITTERFOLLOWERSSTATS_LASTRECORD: "Dernier enregistrement : ",
        //---TWITTERACTIONSSTATS---
        TWITTERACTIONSSTATS_TITLE: "Activité",
        TWITTERACTIONSSTATS_LASTDAY_PILL: "24 heures",
        TWITTERACTIONSSTATS_LASTWEEK_PILL: "7 jours",
        TWITTERACTIONSSTATS_LASTMONTH_PILL: "1 mois",
        TWITTERACTIONSSTATS_LASTQUARTER_PILL: "3 mois",
        TWITTERACTIONSSTATS_LASTSEMESTER_PILL: "6 mois",
        TWITTERACTIONSSTATS_LASTYEAR_PILL: "1 an",
        TWITTERACTIONSSTATS_ACTIONS_YLABEL: "Activité",
        TWITTERACTIONSSTATS_TWEETS_YLABEL: "Tweets",
        TWITTERACTIONSSTATS_RETWEETS_YLABEL: "Retweets",
        TWITTERACTIONSSTATS_FAVORITES_YLABEL: "Favoris",
        TWITTERACTIONSSTATS_ACTIONS_OPTION: "Tout",
        TWITTERACTIONSSTATS_TWEETS_OPTION: "Tweets",
        TWITTERACTIONSSTATS_RETWEETS_OPTIONS: "Retweets",
        TWITTERACTIONSSTATS_FAVORITES_OPTIONS: "Favoris",
        TWITTERACTIONSSTATS_LASTRECORD: "Dernier enregistrement : ",
        //---CONTACT---
        CONTACT_ERROR: "Une erreur est survenue.",
        CONTACT_SUCCESS: "Votre message a été envoyé avec succès.",
        CONTACT_REASON_INCORRECT: "La raison sélectionnée n'est pas valide.",
        CONTACT_EMAIL_INCORRECT: "Un email valide est requis, laissez ce champ vide si vous ne voulez pas être recontacté.",
        CONTACT_MESSAGE_INCORRECT: "Votre message n'est pas valide.",
        //---USETERMS---
        USETERMS_TITLE: "Termes du contrat d'utilisation",
        USETERMS_CONTENT: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor\
            mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna\
            mollis euismod. Donec sed odio dui."
    }
}

export default getLanguage;