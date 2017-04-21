import * as types from '../constants/ActionTypes';

const account = (state = {}, action) =>
{
    switch (action.type)
    {
        case types.CREATE_ACCOUNT:
            return {
                consumer_key: action.consumer_key,
                consumer_secret: action.consumer_secret,
                access_token_key: action.access_token_key,
                access_token_secret: access_token_secret
            };
        case types.UPDATE_ACCOUNT:
            return {

            };
        case types.DELETE_ACCOUNT:
            return {

            };
        case types.ACCOUNT_GET_LIST:
            return {
                
            };
        default:
            return state;
    }
}

export default account;
