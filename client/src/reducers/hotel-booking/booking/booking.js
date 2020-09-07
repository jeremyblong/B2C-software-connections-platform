import { HOTEL_BOOKING_DATA_SEARCH } from "../../../actions/types.js";

const initialState = {

}
 
export default (state = initialState, action) => {
	switch (action.type) {
		case HOTEL_BOOKING_DATA_SEARCH: 
			return {
				...state,
				quick_search_results: action.payload
			}
		default: 
			return state;
	}
}