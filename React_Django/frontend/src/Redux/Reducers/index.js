import { combineReducers } from "redux";
import Leads from "./Leads";
import Errors from "./Errors";

export default combineReducers({
  leadsReducer: Leads,
  errorsReducer: Errors,
});
