import * as types from '../constants/ActionTypes';

export default function messages(state = {}, action) {
  switch (action.type) {
    case 'CONTACT_FORM_FAILURE':
      return {
        error: action.messages
      };
    case 'CONTACT_FORM_SUCCESS':
      return {
        success: action.messages
      };
    case types.SIGNIN_FORM_FAILURE:
      return {
        error: action.messages
      };
    case types.REGISTER_FORM_FAILURE:
      return {
        error: action.messages
      };
    case types.FORGOTPASSWORD_FORM_FAILURE:
      return {
        error: action.messages
      };
    case types.FORGOTPASSWORD_FORM_SUCCESS:
      return {
        success: action.messages
      };
    case types.EDIT_PROFILE_FAILURE:
      return {
        error: action.messages
      };
    case types.EDIT_PROFILE_SUCCESS:
      return {
        success: action.messages
      };
    case 'CLEAR_MESSAGES':
      return {};
    default:
      return state;
  }
}
