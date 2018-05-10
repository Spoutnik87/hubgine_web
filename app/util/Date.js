/**
 * Obtenir le timestamp
 * @public
 * @returns {number} Unix timestamp.
 */
const getUnixTimestamp = () => {
    return Math.round(Date.now()/1000);
};

/**
 * Obtenir la date.
 * @public
 * @param {boolean} time Inclure l'heure dans le format.
 * @returns Retourne la date au format MM/dd/YYYY ou YYYY/MM/dd HH:mm:ss (MM/dd/YYY par défaut)
 */
const getDate = (time = false) => {
    const d = new Date();
    const day = ("0" + d.getUTCDate()).slice(-2);
    const month = ("0" + (d.getUTCMonth() + 1)).slice(-2);
    if (time)
    {
        return d.getUTCFullYear() + "/" + month + "/" + day + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
    }
    else
    {
        return month + "/" + day + "/" + d.getUTCFullYear();
    }
}

/**
 * Convertir une date.
 * @public
 * @param {Date} d Date.
 * @param {boolean} time Inclure l'heure dans le format.
 * @returns Retourne la date au format MM/dd/YYYY ou YYYY/MM/dd HH:mm:ss (MM/dd/YYY par défaut)
 */
const parseDate = (d, time = false) => {
    const day = ("0" + d.getUTCDate()).slice(-2);
    const month = ("0" + (d.getUTCMonth() + 1)).slice(-2);
    if (time)
    {
        return d.getUTCFullYear() + "/" + month + "/" + day + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
    }
    else
    {
        return month + "/" + day + "/" + d.getUTCFullYear();
    }
}

export {
    getUnixTimestamp,
    getDate,
    parseDate
};