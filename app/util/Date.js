/**
 * @public
 * @returns {number} Unix timestamp.
 */
export const getUnixTimestamp = () => {
    return Math.floor(Date.now() / 1000);
};