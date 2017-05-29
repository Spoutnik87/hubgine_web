import * as ActionTypes from "../constants/ActionTypes";

const profile = (state = {}, action) =>
{
    switch (action.type)
    {
        case ActionTypes.USER_GET_INFOS:
            return {
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname
            };
        default:
            return state;
    }
}

export default profile;
