import { FRENCH } from "./lang";

export default function getLanguage()
{
    return {
        //---MAIN VALUES---
        LANG: FRENCH,
        COMPANY_NAME: "Hubgine",
        //---HEADER---
        HEADER_HOME: "Home",
        HEADER_ADMIN_DASHBOARD: "Tableau de bord de l'admin",
        HEADER_USER_DASHBOARD: "Tableau de bord de l'utilisateur",
        HEADER_PROFILE: "Profile",
        HEADER_DISCONNECT: "Se deconnecter",
        HEADER_SIGNIN: "Se connecter",
        HEADER_REGISTER: "S'inscrire",
        //---FOOTER---
        FOOTER_TITLE: "© 2017 Company, Inc. Tous droits résérvés.",
        //---SIGNIN---
        SIGNIN_TITLE: "Se connecter",
        SIGNIN_EMAIL: "Email",
        SIGNIN_PASSWORD: "Mot de passe",
        SIGNIN_FORGOT_PASSWORD: "Mot de passe oublié ?",
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
        PROFILE_PROFILE: "Profile",
        PROFILE_ACCOUNT_LIST: "Liste des comptes",
        PROFILE_EMAIL: "Email",
        PROFILE_FIRSTNAME: "Prénom",
        PROFILE_LASTNAME: "Nom"
    }
}