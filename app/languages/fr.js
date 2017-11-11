import { FRENCH } from "../constants/Languages";

export default function getLanguage()
{
    return {
        //---MAIN VALUES---
        LANG: FRENCH,
        COMPANY_NAME: "Hubgine",
        REACT_DATETIME_LANGUAGE: "fr",
        GENERIC_ERROR: "Une erreur est survenue.",
        SESSION_EXPIRED: "La session est expirée.",
        //---HEADER---
        HEADER_SR_ONLY: "Menu",
        HEADER_HOME: "Home",
        HEADER_ADMIN_DASHBOARD: "Tableau de bord de l'admin",
        HEADER_USER_DASHBOARD: "Tableau de bord de l'utilisateur",
        HEADER_PROFILE: "Profile",
        HEADER_DISCONNECT: "Se deconnecter",
        HEADER_SIGNIN: "Se connecter",
        HEADER_REGISTER: "S'inscrire",
        //---FOOTER---
        FOOTER_TITLE: "© 2017 Company, Inc. Tous droits résérvés.",
        //---NOTFOUND---
        NOTFOUND_TITLE: "Page introuvable",
        //---SIGNIN---
        SIGNIN_TITLE: "Se connecter",
        SIGNIN_EMAIL: "Email",
        SIGNIN_PASSWORD: "Mot de passe",
        SIGNIN_FORGOTPASSWORD: "Mot de passe oublié ?",
        SIGNIN_SUBMIT: "Se connecter",
        SIGNIN_EMAIL_INCORRECT: "L'adresse email est invalide.",
        SIGNIN_PASSWORD_INCORRECT: "Le mot de passe doit avoir une longueur minimale de 6 caractères.",
        SIGNIN_CREDENTIALS_INCORRECT: "Vos identifiants sont incorrects. Reessayez ou changez votre mot de passe.",
        //---REGISTER---
        REGISTER_TITLE: "Inscription",
        REGISTER_SUBMIT: "S'inscrire",
        REGISTER_FIRSTNAME: "Prénom",
        REGISTER_LASTNAME: "Nom",
        REGISTER_EMAIL: "Email",
        REGISTER_PASSWORD: "Mot de passe",
        REGISTER_CONFIRMPASSWORD: "Confirmation du mot de passe",
        REGISTER_USETERMS: "Accepter les conditions d'utilisations",
        REGISTER_FIRSTNAME_INCORRECT: "Vous devez saisir un prénom.",
        REGISTER_LASTNAME_INCORRECT: "Vous devez saisir un nom.",
        REGISTER_EMAIL_INCORRECT: "L'adresse email est invalide.",
        REGISTER_PASSWORD_INCORRECT: "Le mot de passe doit avoir une longueur minimale de 6 caractères.",
        REGISTER_PASSWORD_NOT_MATCH: "Les mots de passe ne sont pas identiques.",
        REGISTER_USETERMS_INCORRECT: "Vous devez accepter les conditions d'utilisations.",
        REGISTER_ERROR: "Une erreur est survenue lors de l'inscription.",
        //---PROFILE---
        PROFILE_TITLE: "Profile",
        PROFILE_ACCOUNT_LIST: "Vos comptes",
        PROFILE_EMAIL: "Email",
        PROFILE_FIRSTNAME: "Prénom",
        PROFILE_LASTNAME: "Nom",
        PROFILE_LANGUAGE: "Langage préféré",
        PROFILE_PASSWORD: "Mot de passe",
        PROFILE_CONFIRMPASSWORD: "Confirmation du mot de passe",
        PROFILE_EDIT_PASSWORD: "Changer le mot de passe",
        PROFILE_CONFIRMEDIT_PASSWORD: "Confirmer",
        PROFILE_CANCELEDIT_PASSWORD: "Annuler",
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
        //---FORGOTPASSWORD---
        FORGOTPASSWORD_TITLE: "Réinitialiser le mot de passe",
        FORGOTPASSWORD_SUBMIT: "Réinitialiser le mot de passe",
        FORGOTPASSWORD_EMAIL: "Email",
        //---TWITTERACCOUNTFORM---
        TWITTERACCOUNTFORM_NAME: "Nom",
        TWITTERACCOUNTFORM_CONSUMERKEY: "Consumer key",
        TWITTERACCOUNTFORM_CONSUMERSECRET: "Consumer secret",
        TWITTERACCOUNTFORM_ACCESSTOKENKEY: "Access token key",
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET: "Access token secret",
        TWITTERACCOUNTFORM_NAME_INCORRECT: "Un nom valide est requis.",
        TWITTERACCOUNTFORM_NAME_NOT_UNIQUE: "Ce nom existe déjà.",
        TWITTERACCOUNTFORM_CONSUMERKEY_INCORRECT: "Votre \"consumer key\" est invalide.",
        TWITTERACCOUNTFORM_CONSUMERSECRET_INCORRECT: "Votre \"consumer secret\" est invalide.",
        TWITTERACCOUNTFORM_ACCESSTOKENKEY_INCORRECT: "Votre \"access token key\" est invalide.",
        TWITTERACCOUNTFORM_ACCESSTOKENSECRET_INCORRECT: "Votre \"access token secret\" est invalide.",
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
        CAMPAIGNFORM_CREATE_TITLE: "Créer un campagne",
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
        CAMPAIGNFORM_DELETE_ERROR: "Une erreur est survenue losssssssssssrs de la suppression de la campagne.",
        //---TWITTERRULEFORM---
        TWITTERRULEFORM_CREATE_TITLE: "Créer une règle twitter",
        TWITTERRULEFORM_EDIT_TITLE: "Editer une règle",
        TWITTERRULEFORM_CREATE_BUTTON: "Créer une règle",
        TWITTERRULEFORM_EDIT_BUTTON: "Editier la règle",
        TWITTERRULEFORM_CANCEL_BUTTON: "Annuler",
        TWITTERRULEFORM_DELETE_BUTTON: "Supprimer la règle",
        TWITTERRULEFORM_NAME: "Nom",
        TWITTERRULEFORM_ACTION: "Action",
        TWITTERRULEFORM_CONDITION: "Condition",
        TWITTERRULEFORM_KEYWORDS: "Mots-clés",
        TWITTERRULEFORM_LANGUAGES: "Langages",
        TWITTERRULEFORM_DELAY: "Délai",
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
        USER_EDIT_SUCCESS: "Votre profile a été mis à jour.",
        //---TWITTERRULE---
        TWITTERRULE_NAME_INCORRECT: "Un nom valide est requis.",
        TWITTERRULE_NAME_NOT_UNIQUE: "Ce nom est déjà utilisé.",
        TWITTERRULE_ACTION_INCORRECT: "Une action valide est requise.",
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
        TWITTERRULE_DELETE_SUCCESS: "Cette règle a été supprimée avec succès."
    }
}