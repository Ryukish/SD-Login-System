import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import succReducer from "./succReducer";
export default combineReducers({
  auth: authReducer,
  results: succReducer,
  errors: errorReducer
});