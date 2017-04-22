import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import profile from './profile';
import accounts from './accounts';
import lang from './lang';

export default combineReducers({
  messages,
  user,
  profile,
  accounts,
  lang
});
