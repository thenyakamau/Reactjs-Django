import { combineReducers } from "redux";
import Leads from "./Leads";
import Errors from "./Errors";
import Messages from "./Messages";

export default combineReducers({
  leadsReducer: Leads,
  errorsReducer: Errors,
  messagesReducer: Messages,
});
