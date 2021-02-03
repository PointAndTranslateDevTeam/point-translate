import { createStore, combineReducers, applyMiddleware } from "redux";
import sourceReducer from "./source";
import targetReducer from "./target";
import toggleReducer from "./toggleReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const mainReducer = combineReducers({
  target: targetReducer,
  source: sourceReducer,
  toggle: toggleReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(mainReducer, middleware);

export default store;
