import { SIGNED_UP_OR_NOT } from "../types.js";

export const completedSignup = (item) => {
	return {
		type: "SIGNED_UP_OR_NOT",
		payload: item
	}
}

