import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import profile from './profile';
import account from './account';
import lang from './lang';

export default combineReducers({
  messages,
  user,
  profile,
  account,
  lang
});
