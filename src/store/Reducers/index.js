import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";

const combinedReducers = combineReducers({
  userInfo: userInfoReducer,
});

export default combinedReducers;
