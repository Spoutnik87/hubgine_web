import en from "./en";
import fr from "./fr";
import * as Language from "../constants/Language";

/**
 * Return corresponding locale.(default: en)
 * @public
 * @param {Language} lang Language.
 * @returns {Object<string,string>}
 */
const getLanguage = lang => {
    switch(lang)
    {
        case Language.FRENCH:
            return fr();
        case Language.ENGLISH:
            return en();
        default:
            return en();
    }
}

export default getLanguage;