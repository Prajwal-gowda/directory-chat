import { FETCH_PRIVATE_CHATS } from "../../store/actions/types";

export default function chatReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PRIVATE_CHATS:
      return action.payload;
    default:
      return state;
  }
}
