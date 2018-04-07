/**
 * Obtenir le timestamp
 * @public
 * @returns {number} Unix timestamp.
 */
const getUnixTimestamp = () => {
    return Math.floor(Date.now() / 1000);
};

/**
 * Obtenir la date.
 * @public
 * @param {boolean} time Inclure l'heure dans le format.
 * @returns Retourne la date au format DD/MM/YYYY ou DD/MM/YYYY hh:mm:ss
 */
const getDate = (time = false) => {
    const d = new Date();
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    if (time)
    {
        return d.getFullYear() + "/" + month + "/" + day + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
    else
    {
        return month + "/" + day + "/" + d.getFullYear();
    }
}

/**
 * Convertir une date.
 * @public
 * @param {Date} d Date.
 * @param {boolean} time Inclure l'heure dans le format.
 * @returns Retourne la date au format DD/MM/YYYY ou DD/MM/YYYY hh:mm:ss
 */
const parseDate = (d, time = false) => {
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    if (time)
    {
        return d.getFullYear() + "/" + month + "/" + day + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
    else
    {
        return month + "/" + day + "/" + d.getFullYear();
    }
}

export {
    getUnixTimestamp,
    getDate,
    parseDate
};