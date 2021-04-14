import { FETCH_USER } from "../actions/types";

export default function toAVoidWarning(state = null, action) {
  // by default state = null. It means when the app is bootsup, it
  // has no clue whether the user is logged in or not.
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
