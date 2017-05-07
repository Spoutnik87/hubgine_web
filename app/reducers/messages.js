import * as types from "../constants/ActionTypes";

export default function messages(state = {}, action) {
  switch (action.type) {
    case types.FAILURE_MESSAGE:
      return {
        error: action.messages
      };
    case types.SUCCESS_MESSAGE:
      return {
        success: action.messages
      };
    case types.CLEAR_MESSAGES:
      return {};
    default:
      return state;
  }
}
