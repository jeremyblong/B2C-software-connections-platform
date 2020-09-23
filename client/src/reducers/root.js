import { combineReducers } from "redux";
import auth from "./auth/auth.js";
import signup_completed from "./signup/completedSignup.js";
import getStreamInfo from "./messaging/chat.js";

export default combineReducers({
	auth,
	signup_completed,
	getStreamInfo
});