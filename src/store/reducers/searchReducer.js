import { FETCH_SEARCH_USERS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SEARCH_USERS:
      return action.searchUsers;
    default:
      return state;
  }
}
