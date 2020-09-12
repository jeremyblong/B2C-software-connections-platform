import { combineReducers } from "redux";
import auth from "./auth/auth.js";
import quickSearchResults from "./hotel-booking/booking/booking.js";
import signup_completed from "./signup/completedSignup.js";

export default combineReducers({
	auth,
	quickSearchResults,
	signup_completed
});