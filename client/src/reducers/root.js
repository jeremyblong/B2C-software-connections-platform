import { combineReducers } from "redux";
import auth from "./auth/auth.js";
import quickSearchResults from "./hotel-booking/booking/booking.js";


export default combineReducers({
	auth,
	quickSearchResults
});