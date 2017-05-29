import * as ActionTypes from "../constants/ActionTypes";

export default function messages(state = {}, action) {
  switch (action.type) {
    case ActionTypes.FAILURE_MESSAGE:
      return {
        error: action.messages
      };
    case ActionTypes.SUCCESS_MESSAGE:
      return {
        success: action.messages
      };
    case ActionTypes.CLEAR_MESSAGES:
      return {};
    default:
      return state;
  }
}
