import en from "./en";
import fr from "./fr";
import * as Languages from "../constants/Languages";

/**
 * Return corresponding locale.(default: en)
 * @public
 * @param {Languages} lang Language.
 * @returns {Object<string,string>}
 */
const getLanguage = lang => {
    switch(lang)
    {
        case Languages.FRENCH:
            return fr();
        case Languages.ENGLISH:
            return en();
        default:
            return en();
    }
}

export default getLanguage;