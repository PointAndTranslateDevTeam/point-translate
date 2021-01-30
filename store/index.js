import { createStore, combineReducers } from "redux";
import sourceReducer from "./source";
import targetReducer from "./target";

const mainReducer = combineReducers({
  target: targetReducer,
  source: sourceReducer,
});

const store = createStore(mainReducer);

export default store;
