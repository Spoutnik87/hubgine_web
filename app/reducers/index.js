import { combineReducers } from "redux";
import messages from "./messages";
import user from "./user";
import accounts from "./accounts";
import lang from "./lang";

export default combineReducers({
  messages,
  user,
  accounts,
  lang
});
