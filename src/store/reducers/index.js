import { combineReducers } from "redux";
import users from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import chatReducer from "./chatReducer";
import currentUser from "./userReducer";
import searchUsers from "./searchReducer";
import employees from "./employeesReducer";

export default combineReducers({
  users: users,
  auth: authReducer,
  errors: errorReducer,
  chats: chatReducer,
  currentUser: currentUser,
  searchUsers: searchUsers,
  employees: employees
});
