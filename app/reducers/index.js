import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import profile from './profile';

export default combineReducers({
  messages,
  user,
  profile
});
