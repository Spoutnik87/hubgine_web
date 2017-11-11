import en from "./en";
import fr from "./fr";
import * as Languages from "../constants/Languages";

export default function getLanguage(lang)
{
    if (lang === Languages.FRENCH) return fr();
    else return en();
}