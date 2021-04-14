import { FETCH_SURVEYS } from "../actions/types";

export default function toAVoidWarning2(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}