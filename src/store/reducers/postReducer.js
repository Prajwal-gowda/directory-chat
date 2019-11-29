import {
  ADD_USER,
  FETCH_ALL_USERS,
  FETCH_USER,
  UPDATE_USER,
  FETCH_PRIVATE_CHATS
} from "../actions/types";

export default function postReducer(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case FETCH_ALL_USERS:
      return action.users;
    case FETCH_USER:
      return action.posts;
    case UPDATE_USER:
      return [...state, action.payload];
    default:
      return state;
  }
}
