import { combineReducers } from "redux";
import { userLoginReducer } from "./userLoginReducers";
import { userData  } from './UserDataReducer'


const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userData: userData,
});
export default rootReducer;
