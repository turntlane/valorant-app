import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunkMiddleware from "redux-thunk";
import combinedReducers from "./Reducers";

export function reduxStore(initialState = {}) {
  const middleware = compose(applyMiddleware(thunkMiddleware));
  return createStore(combinedReducers, initialState, middleware);
}

const store = reduxStore();
export default store;
