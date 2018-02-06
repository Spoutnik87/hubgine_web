import { store as config } from "../../client-config.json";
import { getUnixTimestamp } from "./Date";

/**
Add additional data to an object, this allows to check if data is already in cache.
Patern :
{
    _metadata: {
        type: RequestType,
        date: UnixTimestamp
    },
    data : {
        ...someData
    }
}
 * @public
 * @param {string} state Store object.
 * @returns {Object<any>} Metadata.
 */
export const getMetadata = (state) => {
    return state._metadata ? state._metadata : [];
};

/**
 * Add metadata to store object.
 * @public
 * @param {Object<any>} state Store object.
 * @param {string} requestType Request type.
 * @param {number} date Date.
 * @returns {Object<any>} Store object.
 */
export const addMetadata = (state, requestType, date = getUnixTimestamp()) => {
    let newState = state;
    if (newState._metadata)
    {
        let requestTypeExist = false;
        for (let i = 0; i < newState._metadata.length; i++)
        {
            if (newState._metadata[i].type === requestType)
            {
                requestTypeExist = true;
                newState._metadata[i].date = date;
                break;
            }
        }
        if (!requestTypeExist)
        {
            newState._metadata.push({
                type: requestType,
                date
            });
        }
    }
    else
    {
        newState._metadata = [
            {
                type: requestType,
                date
            }
        ];
    }
    return newState;
};

/**
 * Check if store object is cached and needs to be updated.
 * @public
 * @param {Object<any>} state Store object.
 * @param {string} requestType Request type.
 * @returns {boolean} Store object is cached.
 */
export const isCached =  (state, requestType) => {
    if (state._metadata)
    {
        for (let i = 0; i < state._metadata.length; i++)
        {
            const elem = state._metadata[i];
            if (elem.type === requestType)
            {
                if (elem.date > getUnixTimestamp() - config.cache_time)
                {
                    return true;
                }
            }
        }
    }
    return false;
};