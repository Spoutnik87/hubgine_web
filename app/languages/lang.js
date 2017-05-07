import en from "./en";
import fr from "./fr";

export const FRENCH = "FR";
export const ENGLISH = "EN";

export default function getLanguage(lang)
{
    if (lang === FRENCH) return fr();
    else return en();
}