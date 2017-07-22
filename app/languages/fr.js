import { FRENCH } from "../constants/Languages";

export default function getLanguage()
{
    return {
        //---MAIN VALUES---
        LANG: FRENCH,
        COMPANY_NAME: "Hubgine",
        REACT_DATETIME_LANGUAGE: "fr",
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
        PROFILE_ERROR_GENERIC: "Une erreur est survenue.",
        PROFILE_ERRORLOADING_USER: "Une erreur est survenue lors du chargement de l'utilisateur.",
        PROFILE_ERRORLOADING_ACCOUNTLIST: "Une erreur est survenue lors du chargement de la liste des comptes.",
        PROFILE_ERROREDITING_EMAIL: "L'adresse email est invalide.",
        PROFILE_SUCCESSEDITING_EMAIL: "Adresse email éditée avec succès.",
        PROFILE_ERROREDITING_FIRSTNAME: "Le champ prenom ne doit pas être vide.",
        PROFILE_SUCCESSEDITING_FIRSTNAME: "Prenom édité avec succès.",
        PROFILE_ERROREDITING_LASTNAME: "Le champ nom ne doit pas être vide.",
        PROFILE_SUCCESSEDITING_LASTNAME: "Nom édité avec succès.",
        //---FORGOTPASSWORD---
        FORGOTPASSWORD_TITLE: "Réinitialiser le mot de passe",
        FORGOTPASSWORD_SUBMIT: "Réinitialiser le mot de passe",
        FORGOTPASSWORD_EMAIL: "Email",
        //---ACCOUNTTILE---
        ACCOUNTTILE_NAME: "Nom : ",
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
        //---TWITTERACCOUNTCREATEFORM---
        TWITTERACCOUNTCREATEFORM_SUCCESS: "Un compte a été créé avec succès.",
        TWITTERACCOUNTCREATEFORM_TITLE: "Créer un compte",
        //---TWITTERACCOUNTEDITFORM---
        TWITTERACCOUNTEDITFORM_EDIT_SUCCESS: "Ce compte a été mis à jour.",
        TWITTERACCOUNTEDITFORM_EDIT_ERROR: "Une erreur est survenue lors de la mise à jour du compte.",
        TWITTERACCOUNTEDITFORM_DELETE_SUCCESS: "Ce compte a été supprimé avec succès.",
        TWITTERACCOUNTEDITFORM_DELETE_ERROR: "Une errreur est survenue lors de la suppression du compte.",
        TWITTERACCOUNTEDITFORM_DELETE_BUTTON: "Supprimer"
    }
}