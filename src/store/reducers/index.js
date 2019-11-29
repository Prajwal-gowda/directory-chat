import { combineReducers } from "redux";
import users from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
  users: users,
  auth: authReducer,
  errors: errorReducer,
  chats: chatReducer
});
