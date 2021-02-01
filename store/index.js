import { createStore, combineReducers, applyMiddleware } from "redux";
import sourceReducer from "./source";
import targetReducer from "./target";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const mainReducer = combineReducers({
  target: targetReducer,
  source: sourceReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(mainReducer, middleware);

export default store;
