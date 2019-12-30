import { combineReducers, createStore } from "redux";
import auth from "./auth";
import items from "./items";
import schedules from "./schedules";
import week from "./week";

import root from "./root";

const reducers = combineReducers({
  items,
  schedules,
  auth,
  week,
  root
});

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
