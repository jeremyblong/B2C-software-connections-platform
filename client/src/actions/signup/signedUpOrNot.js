import { SIGNED_UP_OR_NOT, SAVE_CURRENT_ID } from "../types.js";

export const completedSignup = (item) => {
	return {
		type: "SIGNED_UP_OR_NOT",
		payload: item
	}
}
export const saveCurrentID = (item) => {
	return {
		type: "SAVE_CURRENT_ID",
		payload: item
	}
}

