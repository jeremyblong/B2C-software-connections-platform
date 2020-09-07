import { HOTEL_BOOKING_DATA_SEARCH } from "../types.js";

export const hotelBookingData = (item) => {
	return {
		type: "HOTEL_BOOKING_DATA_SEARCH",
		payload: item
	}
}
