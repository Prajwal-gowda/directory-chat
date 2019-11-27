import { combineReducers } from "redux";
import users from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  users: users,
  auth: authReducer,
  errors: errorReducer
});
