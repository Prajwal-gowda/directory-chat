import { FETCH_USER } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      return action.currentUser;
    default:
      return state;
  }
}