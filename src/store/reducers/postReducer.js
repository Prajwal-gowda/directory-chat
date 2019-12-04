import { ADD_USER, FETCH_ALL_USERS, UPDATE_USER } from "../actions/types";

export default function postReducer(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case FETCH_ALL_USERS:
      return action.users;
    case UPDATE_USER:
      return [...state, action.payload];
    default:
      return state;
  }
}
