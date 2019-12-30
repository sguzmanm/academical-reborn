import initState from "./state";
import {ItemTypes} from "../../util/items/items";

export default function reducer(state=initState, action) {
  switch (action.type) {
  case "ADD_EVENT":
    state[ItemTypes.EVENT]=action.payload;
    return {
      ...state
    };
  default:
    return state;
  }
}
