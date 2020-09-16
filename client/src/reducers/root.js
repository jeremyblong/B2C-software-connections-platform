import { combineReducers } from "redux";
import auth from "./auth/auth.js";
import signup_completed from "./signup/completedSignup.js";

export default combineReducers({
	auth,
	signup_completed
});